import { mailOptions, transporter } from "../../config/nodemailer";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  message: "Message",
};

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const requestsByIp = new Map();

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0];
  return ip?.trim() || req.socket.remoteAddress || "unknown";
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const recentRequests = (requestsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestsByIp.set(ip, recentRequests);

  for (const [trackedIp, timestamps] of requestsByIp) {
    if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW)) {
      requestsByIp.delete(trackedIp);
    }
  }
  return false;
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<div class="form-container"><h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${escapeHtml(val)}</p></div>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <style type="text/css"> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } h1 { margin-top: 0; } p { margin: 0; } @media screen and (max-width: 525px) { .wrapper { width: 100% !important; max-width: 100% !important; } .responsive-table { width: 100% !important; } .padding { padding: 24px !important; } .section-padding { padding: 48px 24px 48px 24px !important; } } .form-container { padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid #f2f2f2; } .form-container:last-child { padding: 0; margin: 0; border: none; } .form-heading { color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0; } .form-answer { color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; padding: 0; } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #f1f4f5" > <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" style="padding: 48px 24px 48px 24px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" max-width: 480px; background-color: #ffffff; border-radius: 16px; " class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 48px; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > ${htmlData} </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body></html>`,
  };
};

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (typeof data.website === "string" && data.website.trim()) {
    return res.status(200).json({ success: true });
  }

  const { name, email, message } = data;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({ message: "Bad request" });
  }

  const cleanData = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
  const hasInvalidControlCharacters = Object.values(cleanData).some((value) =>
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)
  );
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanData.email);

  if (
    !cleanData.name ||
    cleanData.name.length > 100 ||
    !validEmail ||
    cleanData.email.length > 254 ||
    !cleanData.message ||
    cleanData.message.length > 5000 ||
    hasInvalidControlCharacters
  ) {
    return res.status(400).json({ message: "Please check your form details" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ message: "Too many messages. Please try again later." });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(cleanData),
      subject: `New message from ${cleanData.name}`,
      replyTo: cleanData.email,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form email failed", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
};
export default handler;
