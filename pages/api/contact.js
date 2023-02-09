import { mailOptions, transporter } from "../../config/nodemailer";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<div class="form-container"><h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p></div>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <style type="text/css"> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } h1 { margin-top: 0; } p { margin: 0; } @media screen and (max-width: 525px) { .wrapper { width: 100% !important; max-width: 100% !important; } .responsive-table { width: 100% !important; } .padding { padding: 24px !important; } .section-padding { padding: 48px 24px 48px 24px !important; } } .form-container { padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid #f2f2f2; } .form-container:last-child { padding: 0; margin: 0; border: none; } .form-heading { color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0; } .form-answer { color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; padding: 0; } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #f1f4f5" > <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" style="padding: 48px 24px 48px 24px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" max-width: 480px; background-color: #ffffff; border-radius: 16px; " class="responsive-table" > <h1>Read Me</h1> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 48px; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > ${htmlData} </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body></html>`,
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.name || !data.email || !data.message) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: `New message from ${data.name}`,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;
