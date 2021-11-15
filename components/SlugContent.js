import React from 'react';
import styled from 'styled-components';
import Grid from './Grid'
import Box from './Box';
import Text from './Text';
import GalleryBlock from './GalleryBlock';
import Image from 'next/image';
import { variants, rotation } from './AnimationVariants'
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player/lazy';
import Markdown from 'react-markdown';
import { ArrowUpThick } from 'akar-icons';

const MarkdownWrapper = styled(Text)`
  
`

const GalleryWrapper = styled(Box)`
  display: flex;
  justify-content:center;
  align-items:flex-end;
  flex-flow: row nowrap;
  padding-top: 56.25%;
  img {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
`

const BackToTop = styled(Box)`
  cursor: pointer;
  svg {
    transition: transform 500ms ${props => props.theme.ease.Btn};
  }
  .arrowUp > svg {
    fill: ${props => props.theme.colors.bg.primary};
  }
  .textPath {
    animation: ${rotation} 30s linear infinite;
    animation-play-state: paused;
    svg {
      fill: ${props => props.theme.colors.content.inverseSecondary};
      transform: scale(1);
    }
  }
  &:hover {
    .textPath {
      animation-play-state: running;
    }
    .textPath > svg {
      transform: scale(1.2);
    }
    .arrowUp > svg {
      fill: ${props => props.theme.colors.content.inverseSecondary};
      transform: scale(0.9);
    }
  }
`

const SlugContent = ({ entry }) => {
  const matrix = entry.matrixCollection.items;
  const ref = React.createRef();
  return (
    <Grid
      as={motion.section}
      px="layout.1"
      overflow="hidden"
      mb={["layout.3/4", null, null, 'layout.1/2']}
      variants={variants.slugContent}
      transition={{
        type: 'spring',
        stiffness: 600,
        damping: 100,
        mass: 10,
      }}
    >
      {matrix && matrix.map((item) => {
        const id = item.__typename;
        switch (id) {
          case 'Media': // MEDIA BLOCK
            return (
              <Grid
                key={item.sys.id}
                columns="1/-1"
                my={["layout.1/4", null, "layout.1/2"]}
                gridTemplateColumns={item.layout === 'Thirds' ? ["1fr", null, "repeat(3, 1fr)"] : item.layout === 'Split' ? ["1fr", "repeat(2, 1fr)"] : "1fr"}
                gridRowGap={["layout.1/2", null, "layout.1"]}
                gridColumnGap={["layout.1/2", null, "layout.1"]}
              >
                {item.assetsCollection.items.map((asset) => {
                  return (
                    <Box
                      span="span 1"
                      width="100%"
                      borderRadius={[8, null, 16]}
                      overflow="hidden"
                      // bg="bg.placeholder"
                      key={asset.sys.id}
                    >
                      {asset.contentType.includes('image') &&
                        <Image
                          src={asset.url}
                          alt={asset.title}
                          placeholder="blur"
                          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          layout="responsive"
                          width={asset.width}
                          height={asset.height}
                          sizes="(max-width: 600px) 48vw, (max-width: 1023px) 96vw"
                        />
                      }
                      {asset.contentType.includes('video') &&
                        <ReactPlayer ref={ref} url={asset.url} playing muted loop width="100%" height="100%" playsinline />
                      }
                    </Box>
                  )
                })}
              </Grid>
            );
            break;
          case 'Text': // TEXT BLOCK
            return (
              <MarkdownWrapper
                my={["layout.1", null, "layout.2"]}
                columns={
                  item.alignText === "Left" ? ["1/-1", null, "1/span 4", "2/span 5"] : item.alignText === "Center" ? ["1/-1", null, "3/span 4", "4/span 6"] : ["1/-1", null, "5/span 4", "7/span 5"]
                }
                key={item.sys.id}
                color="content.inverseTertiary"
                font={["ParagraphSmall", "ParagraphMedium", null, "ParagraphLarge"]}
                textAlign={
                  item.alignText === "Center" ? ['left', null, 'center'] : 'left'
                }
              >
                <Markdown children={item.paragraph} linkTarget="_blank" />
              </MarkdownWrapper>
            );
            break;
          case 'Gallery': // GALLERY BLOCK
            return (
              <GalleryWrapper
                columns="-1/1"
                my={["layout.1/4", null, "layout.1/2"]}
                key={item.sys.id}
              >
                <GalleryBlock item={item} />
              </GalleryWrapper>
            );
            break;
          default:
            console.log(`We don't have the ${id} component.`);
        }
      })}
      <Box
        columns="-1/1"
        display="flex"
        justifyContent="center"
        py="layout.3"
        mb={56}
        color="content.inverseSecondary"
      >
        <BackToTop
          onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box position="absolute" size={["24vw", "12vw"]} className="arrowUp">
            <ArrowUpThick size="100%" strokeWidth={0.25} />
          </Box>
          <Box className="textPath" size={["50vw", "25vw"]}>
            <svg width="100%" height="100%" viewBox="0 0 696 696" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.1724 505.073C45.9591 504.303 45.8905 503.488 45.9666 502.627C46.0428 501.766 46.3242 500.945 46.8109 500.165C47.2837 499.38 47.9879 498.746 48.9237 498.261C50.0795 497.663 51.2014 497.422 52.2892 497.54C53.3679 497.662 54.3475 498.082 55.2282 498.799C56.1089 499.517 56.8439 500.463 57.4334 501.636L61.8898 510.508L42.1572 520.725L37.9886 512.426C37.3429 511.141 37.0019 509.944 36.9656 508.836C36.9154 507.724 37.1427 506.75 37.6473 505.913C38.1519 505.077 38.8951 504.405 39.8766 503.896C40.7298 503.455 41.5687 503.249 42.3933 503.28C43.2088 503.315 43.9402 503.506 44.5877 503.851C45.2305 504.187 45.7587 504.595 46.1724 505.073ZM49.7264 514.288L46.6737 508.211C46.2479 507.363 45.7339 506.708 45.1315 506.245C44.5292 505.783 43.8893 505.521 43.2118 505.461C42.5251 505.406 41.8424 505.554 41.1635 505.906C40.1544 506.428 39.5434 507.202 39.3303 508.228C39.1127 509.245 39.3266 510.395 39.9723 511.681L43.025 517.758L49.7264 514.288ZM55.7231 502.891C55.2787 502.007 54.7322 501.321 54.0836 500.836C53.4258 500.355 52.726 500.089 51.9841 500.039C51.2331 499.994 50.4952 500.159 49.7705 500.534C49.0458 500.909 48.4947 501.412 48.1174 502.041C47.7263 502.666 47.5431 503.383 47.5678 504.192C47.5787 504.996 47.8088 505.845 48.2579 506.739L51.5703 513.333L59.0286 509.472L55.7231 502.891Z" />
              <path d="M39.4675 476.917L43.3016 486.389L50.1376 486.114L51.0536 488.377L27.3949 489.092L26.2206 486.191L43.5791 469.911L44.5303 472.261L39.4675 476.917ZM37.8264 478.432L31.7455 484.038L28.9753 486.601L28.5373 487.005L29.1624 486.981L32.8728 486.823L41.0851 486.483L37.8264 478.432Z" />
              <path d="M38.1899 452.388C38.8525 454.511 38.9276 456.499 38.4152 458.353C37.893 460.21 36.9072 461.811 35.4577 463.154C33.9985 464.501 32.2234 465.511 30.1324 466.184C28.0905 466.841 26.1291 467.011 24.248 466.695C22.3638 466.369 20.7257 465.585 19.3337 464.344C17.9287 463.096 16.9105 461.461 16.279 459.438C15.7315 457.683 15.5826 456.064 15.8323 454.58C16.0691 453.089 16.5387 451.825 17.241 450.787C17.9403 449.74 18.7176 448.925 19.5729 448.343L21.0098 450.299C20.3353 450.768 19.7139 451.39 19.1456 452.165C18.5743 452.93 18.1793 453.88 17.9608 455.014C17.7324 456.151 17.8345 457.413 18.2669 458.798C18.7677 460.403 19.5566 461.684 20.6336 462.643C21.6977 463.595 22.9821 464.18 24.4868 464.397C25.9915 464.615 27.6274 464.44 29.3944 463.871C31.1713 463.3 32.662 462.469 33.8667 461.38C35.0683 460.28 35.8816 459.009 36.3065 457.568C36.7315 456.126 36.6967 454.612 36.202 453.028C35.5737 451.014 34.6187 449.616 33.3372 448.833C32.0459 448.053 30.5356 447.662 28.8063 447.659L28.9395 445.23C30.1773 445.216 31.3986 445.443 32.6033 445.911C33.8048 446.368 34.9041 447.139 35.9012 448.222C36.8951 449.295 37.658 450.684 38.1899 452.388Z" />
              <path d="M20.2304 430.867L24.5113 433.496L32.0269 431.759L32.5172 433.946L10.9192 438.938L10.4289 436.751L21.755 434.133L8.00805 425.956L7.33941 422.974L18.3513 429.693L28.5637 416.315L29.2221 419.251L20.2304 430.867Z" />
              <path d="M4.78848 391.928L5.63823 400.037L3.54925 400.263L1.57359 381.409L3.66256 381.183L4.5548 389.698L24.4922 387.545L24.7259 389.775L4.78848 391.928Z" />
              <path d="M23.2262 360.819C23.2723 362.857 22.8305 364.723 21.9006 366.418C20.9707 368.113 19.6468 369.467 17.9289 370.479C16.2005 371.482 14.2141 372.009 11.9698 372.061C9.72546 372.114 7.72246 371.679 5.96082 370.758C4.19893 369.827 2.82034 368.536 1.82504 366.886C0.819443 365.236 0.293578 363.392 0.247444 361.354C0.201073 359.305 0.642951 357.438 1.57308 355.754C2.49291 354.07 3.81188 352.727 5.53 351.724C7.24811 350.722 9.22934 350.195 11.4737 350.143C13.718 350.091 15.7262 350.525 17.4981 351.446C19.2597 352.367 20.6433 353.647 21.6486 355.286C22.654 356.926 23.1798 358.77 23.2262 360.819ZM21.1418 360.883C21.1035 359.189 20.663 357.704 19.8203 356.427C18.9674 355.15 17.8173 354.173 16.3702 353.496C14.9231 352.818 13.309 352.5 11.528 352.542C9.75721 352.583 8.16436 352.975 6.74942 353.72C5.33448 354.464 4.23503 355.493 3.45105 356.808C2.66707 358.123 2.29424 359.627 2.33257 361.321C2.37089 363.014 2.81138 364.499 3.65404 365.776C4.49669 367.054 5.64157 368.031 7.08868 368.708C8.5255 369.386 10.1344 369.704 11.9155 369.663C13.6966 369.621 15.2946 369.228 16.7095 368.484C18.1244 367.74 19.229 366.71 20.0233 365.395C20.8073 364.08 21.1801 362.576 21.1418 360.883Z" />
              <path d="M4.23703 319.678L3.43305 327.792L1.34284 327.578L3.21209 308.713L5.3023 308.927L4.45812 317.446L24.4074 319.484L24.1863 321.715L4.23703 319.678Z" />
              <path d="M28.5595 293.059C28.1935 295.063 27.3844 296.798 26.1323 298.264C24.8802 299.73 23.3113 300.779 21.4256 301.413C19.5316 302.035 17.4809 302.138 15.2736 301.723C13.0662 301.307 11.1933 300.466 9.65483 299.198C8.11821 297.92 7.02923 296.37 6.3879 294.548C5.73644 292.724 5.59371 290.81 5.95973 288.805C6.32762 286.79 7.13668 285.055 8.38691 283.6C9.62701 282.142 11.189 281.102 13.0729 280.478C14.9567 279.854 17.0023 279.75 19.2097 280.166C21.417 280.581 23.295 281.424 24.8436 282.694C26.3821 283.961 27.478 285.502 28.1313 287.316C28.7847 289.129 28.9274 291.044 28.5595 293.059ZM26.5063 292.688C26.8104 291.023 26.6788 289.477 26.1117 288.052C25.5344 286.625 24.6059 285.429 23.3261 284.465C22.0463 283.502 20.5306 282.855 18.7789 282.525C17.0373 282.197 15.399 282.25 13.864 282.685C12.3289 283.119 11.045 283.898 10.0124 285.022C8.97973 286.146 8.31137 287.541 8.0073 289.206C7.70322 290.872 7.83476 292.417 8.40191 293.842C8.96907 295.268 9.89254 296.462 11.1723 297.426C12.442 298.388 13.9527 299.034 15.7043 299.364C17.456 299.693 19.0994 299.641 20.6345 299.207C22.1695 298.773 23.4584 297.995 24.5012 296.872C25.5339 295.748 26.2022 294.353 26.5063 292.688Z" />
              <path d="M11.077 266.699L13.3049 258.408C13.7007 256.935 14.3077 255.749 15.126 254.848C15.9444 253.948 16.9023 253.363 17.9997 253.092C19.0871 252.819 20.2418 252.852 21.4638 253.19C22.6858 253.529 23.6955 254.101 24.4929 254.907C25.2931 255.703 25.8191 256.705 26.071 257.912C26.3256 259.11 26.2523 260.455 25.8512 261.948L24.2209 268.015L33.0281 270.454L32.4468 272.618L11.077 266.699ZM23.8421 261.798C24.1457 260.668 24.2067 259.666 24.0252 258.793C23.8438 257.919 23.474 257.209 22.9158 256.665C22.3505 256.107 21.6605 255.715 20.8458 255.49C20.0213 255.261 19.2423 255.241 18.5089 255.428C17.7782 255.605 17.126 256.025 16.5525 256.69C15.9717 257.342 15.5254 258.248 15.2137 259.408L13.6851 265.097L22.3135 267.487L23.8421 261.798Z" />
              <path d="M45.4407 217.338C45.0284 218.285 44.4166 219.056 43.6053 219.652C42.794 220.248 41.8934 220.61 40.9034 220.737C39.9041 220.86 38.9523 220.718 38.0482 220.312C37.0969 219.885 36.3278 219.26 35.7407 218.436C35.1484 217.599 34.7964 216.675 34.6847 215.664C34.5678 214.64 34.7155 213.655 35.1278 212.708C35.5401 211.762 36.1566 210.992 36.9773 210.401C37.7886 209.805 38.6966 209.452 39.7012 209.343C40.7006 209.22 41.6758 209.372 42.6271 209.799C43.5312 210.205 44.2748 210.824 44.8577 211.658C45.4353 212.477 45.7779 213.397 45.8854 214.417C45.9971 215.427 45.8488 216.401 45.4407 217.338Z" />
              <path d="M66.6433 164.911C67.1903 164.336 67.8491 163.864 68.6197 163.496C69.3903 163.129 70.2301 162.962 71.139 162.995C72.0449 163.013 72.9399 163.31 73.824 163.886C74.9161 164.597 75.6867 165.459 76.1356 166.472C76.5759 167.479 76.7131 168.55 76.5471 169.684C76.3812 170.818 75.9479 171.94 75.2473 173.048L69.9513 181.431L51.3068 169.288L56.2609 161.447C57.0282 160.233 57.8737 159.33 58.7975 158.739C59.7183 158.134 60.6615 157.842 61.6274 157.862C62.5933 157.882 63.5399 158.195 64.4674 158.799C65.2735 159.324 65.8715 159.955 66.2614 160.694C66.6427 161.426 66.8497 162.164 66.8826 162.906C66.9211 163.639 66.8413 164.307 66.6433 164.911ZM60.5996 172.676L64.2275 166.934C64.7335 166.133 65.0313 165.352 65.1209 164.59C65.2105 163.829 65.1099 163.136 64.8191 162.512C64.5196 161.882 64.0492 161.358 63.4077 160.941C62.4543 160.32 61.4877 160.175 60.5079 160.505C59.5337 160.827 58.663 161.596 57.8957 162.81L54.2677 168.552L60.5996 172.676ZM73.3169 172.182C73.8451 171.346 74.1522 170.522 74.238 169.708C74.3152 168.889 74.1879 168.141 73.8562 167.466C73.5159 166.785 73.0033 166.221 72.3186 165.775C71.6338 165.329 70.9285 165.099 70.2027 165.086C69.4738 165.059 68.7718 165.26 68.0965 165.69C67.4182 166.105 66.8121 166.735 66.2783 167.58L62.3418 173.81L69.3887 178.4L73.3169 172.182Z" />
              <path d="M87.2048 144.827L81.084 152.967L84.7668 158.821L83.3046 160.765L70.7598 140.388L72.6345 137.894L95.2368 144.897L93.7183 146.917L87.2048 144.827ZM85.088 144.154L77.2525 141.651L73.6752 140.516L73.1114 140.336L73.4467 140.872L75.4528 144.045L79.8858 151.072L85.088 144.154Z" />
              <path d="M107.42 131.334C105.949 132.986 104.296 134.055 102.46 134.541C100.618 135.02 98.7594 134.963 96.8854 134.371C95.0038 133.771 93.2494 132.724 91.6224 131.231C90.0335 129.772 88.899 128.139 88.2187 126.331C87.5454 124.515 87.3853 122.683 87.7384 120.837C88.0909 118.976 88.9681 117.258 90.37 115.684C91.5855 114.319 92.8873 113.371 94.2755 112.841C95.6629 112.297 96.975 112.07 98.2117 112.163C99.4554 112.247 100.541 112.517 101.467 112.973L100.529 115.22C99.7894 114.865 98.9468 114.634 98.0009 114.527C97.062 114.412 96.0552 114.545 94.9804 114.926C93.898 115.3 92.8768 116.025 91.9169 117.103C90.805 118.352 90.1131 119.69 89.8412 121.118C89.5686 122.531 89.7193 123.952 90.2933 125.381C90.8672 126.81 91.8417 128.155 93.2166 129.417C94.5992 130.686 96.0577 131.574 97.592 132.08C99.1333 132.579 100.624 132.651 102.065 132.296C103.505 131.941 104.775 131.147 105.873 129.914C107.268 128.347 107.975 126.805 107.995 125.286C108.006 123.761 107.577 122.239 106.707 120.722L108.84 119.614C109.476 120.691 109.9 121.876 110.11 123.168C110.326 124.453 110.226 125.805 109.808 127.226C109.397 128.638 108.601 130.008 107.42 131.334Z" />
              <path d="M116.66 104.734L116.584 109.813L121.853 115.524L120.241 117.057L105.098 100.644L106.711 99.1105L114.651 107.718L114.67 91.5417L116.868 89.4512L116.71 102.494L133.239 104.696L131.075 106.755L116.66 104.734Z" />
              <path d="M141.982 71.5503L135.515 76.3865L134.269 74.6691L149.306 63.425L150.552 65.1423L143.761 70.2203L155.651 86.6106L153.873 87.9406L141.982 71.5503Z" />
              <path d="M177.742 72.0171C176.032 73.0859 174.222 73.6402 172.312 73.6802C170.401 73.7202 168.582 73.2427 166.854 72.2477C165.129 71.2383 163.679 69.7632 162.502 67.8222C161.325 65.8812 160.684 63.9063 160.578 61.8974C160.482 59.883 160.884 58.0233 161.785 56.3184C162.681 54.6046 163.984 53.2133 165.694 52.1446C167.412 51.0704 169.223 50.516 171.125 50.4815C173.021 50.4381 174.829 50.9166 176.548 51.9171C178.267 52.9176 179.715 54.3883 180.892 56.3292C182.068 58.2702 182.712 60.2496 182.823 62.2674C182.929 64.2763 182.538 66.1349 181.651 67.8433C180.764 69.5516 179.461 70.9429 177.742 72.0171ZM176.636 70.2224C178.057 69.3345 179.098 68.1991 179.759 66.8161C180.414 65.4243 180.665 63.9232 180.511 62.3129C180.357 60.7026 179.813 59.1274 178.879 57.5871C177.951 56.0557 176.813 54.8575 175.466 53.9926C174.12 53.1277 172.689 52.6834 171.175 52.6596C169.662 52.6358 168.194 53.0679 166.774 53.9557C165.353 54.8436 164.312 55.979 163.651 57.362C162.99 58.745 162.737 60.2416 162.891 61.8519C163.039 63.4533 163.581 65.0241 164.515 66.5644C165.448 68.1047 166.589 69.3073 167.935 70.1722C169.282 71.0371 170.715 71.4859 172.234 71.5186C173.748 71.5423 175.215 71.1103 176.636 70.2224Z" />
              <path d="M203.147 34.6154L195.841 38.0044L194.968 36.0644L211.954 28.185L212.827 30.125L205.156 33.6834L213.488 52.1985L211.479 53.1305L203.147 34.6154Z" />
              <path d="M238.055 42.5062C236.166 43.1968 234.282 43.363 232.404 43.0049C230.526 42.6467 228.842 41.8011 227.351 40.468C225.867 39.1214 224.744 37.3759 223.984 35.2314C223.224 33.0869 222.994 31.0205 223.296 29.0323C223.608 27.0404 224.377 25.3038 225.603 23.8224C226.825 22.3311 228.381 21.2402 230.27 20.5497C232.169 19.8556 234.053 19.6894 235.922 20.051C237.787 20.4028 239.459 21.2471 240.94 22.5838C242.421 23.9205 243.542 25.6611 244.302 27.8056C245.062 29.9501 245.293 32.0214 244.995 34.0195C244.693 36.0078 243.936 37.7458 242.723 39.2335C241.51 40.7213 239.954 41.8122 238.055 42.5062ZM237.334 40.5195C238.904 39.9458 240.152 39.0509 241.078 37.8347C242 36.6086 242.548 35.1915 242.722 33.5833C242.897 31.9751 242.682 30.3201 242.078 28.6183C241.479 26.9263 240.607 25.517 239.463 24.3905C238.319 23.2639 237.009 22.5316 235.532 22.1936C234.055 21.8555 232.532 21.9733 230.962 22.547C229.392 23.1207 228.145 24.0156 227.219 25.2319C226.293 26.4481 225.743 27.8603 225.569 29.4685C225.391 31.0668 225.604 32.7169 226.208 34.4187C226.811 36.1205 227.685 37.5347 228.828 38.6613C229.972 39.7879 231.284 40.5251 232.764 40.873C234.241 41.211 235.765 41.0932 237.334 40.5195Z" />
              <path d="M251.652 13.8814L259.827 11.6513C261.279 11.2552 262.594 11.1887 263.773 11.4518C264.951 11.7148 265.932 12.2591 266.716 13.0846C267.497 13.9001 268.052 14.9287 268.381 16.1707C268.709 17.4126 268.732 18.5864 268.449 19.6921C268.176 20.7951 267.589 21.7617 266.689 22.5918C265.799 23.4192 264.618 24.0337 263.146 24.4352L257.164 26.0671L259.533 35.0181L257.4 35.6L251.652 13.8814ZM262.26 22.5983C263.374 22.2945 264.257 21.8425 264.908 21.2426C265.56 20.6426 265.977 19.9606 266.158 19.1965C266.347 18.4196 266.332 17.6172 266.113 16.7892C265.891 15.9512 265.516 15.2579 264.987 14.7094C264.468 14.1581 263.781 13.7988 262.926 13.6314C262.079 13.4512 261.083 13.5171 259.939 13.8291L254.33 15.3593L256.651 24.1285L262.26 22.5983Z" />
              <path d="M310.966 19.0997C309.953 19.2159 308.988 19.0687 308.072 18.6583C307.156 18.2478 306.394 17.6408 305.787 16.8372C305.178 16.0232 304.818 15.1175 304.707 14.1201C304.59 13.0709 304.734 12.0811 305.138 11.1509C305.552 10.2092 306.16 9.43446 306.963 8.82681C307.775 8.20759 308.687 7.83988 309.7 7.72368C310.713 7.60748 311.678 7.75981 312.596 8.18067C313.512 8.59114 314.27 9.20916 314.87 10.0347C315.478 10.8487 315.841 11.7803 315.958 12.8296C316.069 13.827 315.917 14.7913 315.503 15.7227C315.097 16.6425 314.488 17.4068 313.675 18.0157C312.872 18.6233 311.969 18.9847 310.966 19.0997Z" />
              <path d="M366.241 11.2267C367.006 11.4154 367.739 11.7545 368.44 12.244C369.142 12.7335 369.707 13.3848 370.137 14.1979C370.578 15.001 370.776 15.9352 370.732 17.0007C370.677 18.3169 370.332 19.4274 369.696 20.3324C369.061 21.2268 368.22 21.8878 367.171 22.3151C366.123 22.7425 364.95 22.9293 363.654 22.8755L353.853 22.469L354.788 0L363.956 0.380314C365.376 0.439218 366.57 0.72419 367.538 1.23523C368.517 1.73625 369.241 2.41505 369.71 3.27163C370.18 4.12821 370.391 5.11535 370.345 6.23306C370.304 7.20452 370.068 8.04753 369.637 8.76209C369.205 9.46621 368.682 10.02 368.068 10.4235C367.463 10.8275 366.855 11.0952 366.241 11.2267ZM356.589 9.85318L363.303 10.1317C364.239 10.1705 365.054 10.0369 365.747 9.73082C366.44 9.42472 366.978 8.98666 367.363 8.41663C367.748 7.83616 367.956 7.15943 367.988 6.38644C368.036 5.2374 367.672 4.31719 366.897 3.62581C366.132 2.93485 365.04 2.55992 363.62 2.50102L356.906 2.22251L356.589 9.85318ZM363.418 20.7468C364.395 20.7874 365.252 20.6398 365.987 20.3041C366.723 19.9579 367.295 19.4689 367.702 18.837C368.11 18.1947 368.332 17.461 368.366 16.6358C368.4 15.8105 368.24 15.0767 367.885 14.4341C367.542 13.7815 367.017 13.268 366.311 12.8934C365.616 12.5088 364.774 12.296 363.786 12.255L356.502 11.9528L356.148 20.4453L363.418 20.7468Z" />
              <path d="M393.7 19.1268L383.69 17.8682L380.57 24.0497L378.179 23.7491L389.179 2.47138L392.245 2.85687L397.693 26.2027L395.21 25.8904L393.7 19.1268ZM393.205 16.9312L391.38 8.80046L390.54 5.09194L390.409 4.50658L390.123 5.07102L388.437 8.43039L384.697 15.8615L393.205 16.9312Z" />
              <path d="M415.376 30.0378C413.229 29.5818 411.486 28.6721 410.146 27.3088C408.809 25.9352 407.92 24.2776 407.478 22.3359C407.039 20.384 407.044 18.3181 407.493 16.1384C407.932 14.0098 408.748 12.1912 409.943 10.6825C411.148 9.17596 412.624 8.11169 414.373 7.48971C416.133 6.85963 418.037 6.76191 420.083 7.19656C421.857 7.57339 423.319 8.23655 424.47 9.18602C425.633 10.1274 426.488 11.1634 427.033 12.294C427.589 13.4268 427.907 14.5144 427.986 15.5568L425.603 15.8675C425.531 15.0405 425.302 14.1854 424.916 13.3023C424.54 12.4213 423.919 11.6058 423.053 10.8557C422.189 10.0954 421.057 9.56646 419.656 9.26885C418.033 8.92413 416.546 8.99278 415.194 9.4748C413.855 9.94873 412.723 10.7977 411.797 12.0217C410.872 13.2458 410.219 14.7788 409.84 16.6208C409.458 18.4731 409.439 20.1995 409.782 21.7999C410.136 23.4025 410.827 24.7456 411.856 25.8293C412.884 26.913 414.2 27.6251 415.803 27.9655C417.839 28.398 419.507 28.2398 420.808 27.4907C422.112 26.7315 423.189 25.5877 424.041 24.0596L426.059 25.3695C425.464 26.4714 424.669 27.4403 423.677 28.2762C422.694 29.1142 421.493 29.7083 420.074 30.0585C418.665 30.4109 417.099 30.4039 415.376 30.0378Z" />
              <path d="M442.658 24.7173L438.301 27.2129L436.102 34.7134L433.985 34.0736L440.303 12.5191L442.421 13.1589L439.107 24.4622L452.873 16.3174L455.76 17.1897L444.588 23.6315L451.055 39.2319L448.212 38.3729L442.658 24.7173Z" />
              <path d="M483.652 30.1744L476.277 26.9451L477.108 24.9866L494.257 32.4946L493.425 34.4531L485.681 31.0624L477.741 49.7546L475.713 48.8665L483.652 30.1744Z" />
              <path d="M501.299 61.7553C499.528 60.7955 498.143 59.4883 497.145 57.8337C496.147 56.1791 495.635 54.3435 495.61 52.3269C495.598 50.306 496.121 48.2901 497.178 46.2793C498.234 44.2684 499.59 42.71 501.246 41.604C502.91 40.5029 504.694 39.9172 506.599 39.8469C508.508 39.7673 510.349 40.2075 512.12 41.1673C513.901 42.132 515.286 43.4392 516.275 45.0889C517.268 46.7293 517.773 48.5554 517.79 50.5671C517.806 52.5788 517.286 54.5901 516.229 56.6009C515.172 58.6117 513.814 60.1748 512.154 61.29C510.499 62.3961 508.721 62.9913 506.821 63.0757C504.921 63.1602 503.08 62.72 501.299 61.7553ZM502.267 59.8801C503.739 60.6774 505.23 61.017 506.74 60.8986C508.254 60.771 509.657 60.2335 510.949 59.2861C512.24 58.3386 513.306 57.067 514.144 55.4713C514.978 53.8848 515.423 52.2831 515.479 50.6662C515.535 49.0494 515.192 47.5714 514.448 46.2324C513.704 44.8934 512.597 43.8252 511.125 43.0278C509.653 42.2304 508.162 41.8909 506.653 42.0092C505.143 42.1276 503.743 42.6605 502.451 43.6079C501.164 44.5461 500.101 45.8131 499.263 47.4089C498.424 49.0046 497.977 50.6109 497.92 52.2278C497.864 53.8446 498.206 55.3272 498.944 56.6754C499.688 58.0145 500.796 59.0827 502.267 59.8801Z" />
              <path d="M545.922 65.1549L539.354 60.4605L540.563 58.7165L555.834 69.6309L554.625 71.3749L547.728 66.4458L536.187 83.091L534.38 81.8001L545.922 65.1549Z" />
              <path d="M556.824 99.7359C555.284 98.4281 554.192 96.8607 553.549 95.0337C552.906 93.2067 552.775 91.3036 553.157 89.3244C553.553 87.3439 554.471 85.4794 555.911 83.7309C557.351 81.9824 558.993 80.739 560.836 80.0005C562.687 79.2688 564.552 79.0665 566.43 79.3937C568.315 79.7128 570.028 80.5263 571.568 81.8341C573.117 83.1487 574.209 84.7161 574.844 86.5364C575.485 88.3487 575.611 90.2411 575.222 92.2136C574.832 94.186 573.917 96.0465 572.477 97.795C571.037 99.5435 569.392 100.791 567.543 101.537C565.699 102.276 563.839 102.489 561.962 102.176C560.085 101.864 558.372 101.05 556.824 99.7359ZM558.15 98.1017C559.43 99.1882 560.82 99.8305 562.322 100.028C563.83 100.218 565.312 99.9841 566.767 99.3253C568.222 98.6665 569.521 97.6433 570.664 96.2558C571.8 94.8763 572.559 93.401 572.94 91.8301C573.321 90.2592 573.283 88.7411 572.825 87.2759C572.367 85.8106 571.499 84.5347 570.219 83.4482C568.939 82.3617 567.548 81.7195 566.047 81.5214C564.546 81.3234 563.067 81.5538 561.612 82.2126C560.163 82.8634 558.867 83.8825 557.724 85.2701C556.581 86.6576 555.82 88.1369 555.439 89.7078C555.058 91.2787 555.093 92.8008 555.544 94.2741C556.001 95.7393 556.87 97.0152 558.15 98.1017Z" />
              <path d="M588.026 97.212L594.047 103.253C595.117 104.326 595.837 105.445 596.208 106.611C596.578 107.777 596.611 108.911 596.304 110.015C596.005 111.111 595.41 112.116 594.519 113.031C593.629 113.946 592.642 114.558 591.559 114.867C590.483 115.184 589.365 115.158 588.205 114.788C587.053 114.425 585.934 113.7 584.85 112.612L580.444 108.192L574.028 114.784L572.456 113.208L588.026 97.212ZM585.965 110.909C586.786 111.732 587.615 112.278 588.454 112.546C589.293 112.815 590.084 112.836 590.825 112.61C591.581 112.383 592.256 111.965 592.849 111.355C593.45 110.738 593.85 110.059 594.05 109.319C594.257 108.586 594.216 107.802 593.927 106.968C593.653 106.135 593.094 105.295 592.252 104.45L588.121 100.305L581.834 106.764L585.965 110.909Z" />
              <path d="M613.513 151.84C612.903 151.01 612.542 150.09 612.429 149.08C612.316 148.07 612.447 147.096 612.824 146.158C613.209 145.213 613.798 144.441 614.59 143.841C615.424 143.209 616.338 142.835 617.333 142.721C618.342 142.608 619.308 142.75 620.23 143.147C621.166 143.547 621.939 144.161 622.549 144.99C623.159 145.82 623.516 146.743 623.621 147.759C623.734 148.769 623.591 149.746 623.192 150.688C622.807 151.632 622.197 152.42 621.364 153.052C620.572 153.652 619.675 154.006 618.674 154.112C617.687 154.221 616.73 154.073 615.802 153.667C614.88 153.27 614.117 152.661 613.513 151.84Z" />
              <path d="M648.093 196.332C648.318 197.098 648.399 197.912 648.337 198.774C648.274 199.636 648.005 200.461 647.531 201.249C647.07 202.041 646.376 202.687 645.447 203.186C644.301 203.803 643.183 204.062 642.093 203.961C641.013 203.856 640.027 203.452 639.135 202.749C638.244 202.045 637.494 201.111 636.886 199.947L632.293 191.148L651.866 180.618L656.162 188.849C656.828 190.124 657.187 191.315 657.24 192.422C657.308 193.533 657.096 194.511 656.604 195.355C656.112 196.2 655.38 196.884 654.406 197.408C653.56 197.863 652.724 198.082 651.899 198.064C651.083 198.042 650.349 197.863 649.696 197.528C649.048 197.202 648.514 196.803 648.093 196.332ZM644.397 187.174L647.543 193.202C647.982 194.043 648.506 194.69 649.116 195.143C649.725 195.596 650.369 195.847 651.047 195.896C651.735 195.94 652.415 195.781 653.088 195.419C654.089 194.88 654.688 194.097 654.885 193.068C655.087 192.048 654.856 190.901 654.19 189.626L651.044 183.598L644.397 187.174ZM638.577 198.665C639.035 199.543 639.592 200.219 640.248 200.694C640.913 201.165 641.617 201.419 642.36 201.458C643.111 201.491 643.847 201.314 644.566 200.927C645.284 200.541 645.828 200.03 646.195 199.394C646.577 198.763 646.749 198.043 646.711 197.235C646.688 196.431 646.445 195.586 645.982 194.699L642.568 188.158L635.17 192.138L638.577 198.665Z" />
              <path d="M655.233 224.376L651.253 214.966L644.422 215.35L643.471 213.102L667.115 212.01L668.335 214.892L651.23 231.446L650.242 229.112L655.233 224.376ZM656.85 222.834L662.844 217.132L665.574 214.525L666.006 214.115L665.381 214.148L661.673 214.365L653.467 214.837L656.85 222.834Z" />
              <path d="M656.889 248.882C656.194 246.77 656.088 244.783 656.572 242.921C657.065 241.056 658.026 239.44 659.455 238.074C660.893 236.704 662.652 235.666 664.733 234.96C666.764 234.27 668.723 234.069 670.609 234.355C672.498 234.651 674.148 235.408 675.559 236.627C676.983 237.852 678.026 239.471 678.689 241.484C679.263 243.229 679.437 244.846 679.21 246.334C678.997 247.829 678.547 249.1 677.861 250.149C677.178 251.207 676.413 252.035 675.567 252.631L674.1 250.698C674.767 250.218 675.379 249.586 675.935 248.802C676.494 248.027 676.875 247.072 677.076 245.934C677.286 244.793 677.165 243.534 676.711 242.155C676.185 240.559 675.377 239.29 674.285 238.349C673.206 237.414 671.913 236.85 670.405 236.656C668.897 236.462 667.264 236.664 665.506 237.26C663.739 237.86 662.261 238.714 661.073 239.823C659.889 240.941 659.095 242.225 658.693 243.673C658.29 245.122 658.348 246.634 658.867 248.211C659.527 250.214 660.503 251.597 661.797 252.359C663.1 253.119 664.616 253.486 666.345 253.462L666.249 255.892C665.012 255.926 663.787 255.719 662.576 255.27C661.367 254.831 660.256 254.078 659.242 253.011C658.232 251.954 657.448 250.578 656.889 248.882Z" />
              <path d="M675.179 270.112L670.858 267.551L663.37 269.408L662.846 267.229L684.364 261.893L684.888 264.072L673.604 266.87L687.476 274.828L688.191 277.799L677.076 271.256L667.072 284.795L666.368 281.87L675.179 270.112Z" />
              <path d="M691.222 308.801L690.247 300.706L692.332 300.447L694.599 319.268L692.514 319.527L691.49 311.027L671.588 313.498L671.32 311.272L691.222 308.801Z" />
              <path d="M673.267 340.203C673.19 338.165 673.603 336.292 674.506 334.583C675.41 332.873 676.713 331.498 678.415 330.458C680.127 329.429 682.105 328.87 684.349 328.782C686.592 328.693 688.601 329.096 690.377 329.989C692.153 330.892 693.551 332.161 694.572 333.795C695.603 335.428 696.157 337.264 696.235 339.301C696.313 341.349 695.9 343.222 694.996 344.921C694.102 346.62 692.804 347.984 691.102 349.013C689.399 350.043 687.426 350.601 685.183 350.69C682.94 350.778 680.925 350.375 679.139 349.483C677.364 348.59 675.961 347.332 674.93 345.709C673.899 344.086 673.345 342.25 673.267 340.203ZM675.35 340.105C675.415 341.798 675.878 343.276 676.74 344.539C677.613 345.802 678.778 346.761 680.235 347.415C681.693 348.07 683.312 348.362 685.092 348.292C686.862 348.222 688.448 347.804 689.852 347.038C691.255 346.271 692.338 345.224 693.102 343.897C693.865 342.569 694.215 341.06 694.151 339.367C694.086 337.675 693.623 336.197 692.76 334.933C691.898 333.669 690.738 332.711 689.281 332.056C687.834 331.402 686.22 331.109 684.44 331.179C682.66 331.249 681.068 331.667 679.665 332.434C678.261 333.2 677.173 334.248 676.399 335.575C675.635 336.903 675.286 338.413 675.35 340.105Z" />
              <path d="M692.89 381.033L693.568 372.907L695.662 373.087L694.084 391.98L691.991 391.8L692.703 383.268L672.725 381.548L672.912 379.314L692.89 381.033Z" />
              <path d="M668.982 408.037C669.317 406.027 670.099 404.279 671.328 402.794C672.557 401.308 674.11 400.233 675.985 399.569C677.87 398.918 679.918 398.782 682.132 399.162C684.345 399.542 686.231 400.354 687.789 401.597C689.345 402.85 690.458 404.383 691.127 406.194C691.807 408.008 691.979 409.919 691.644 411.93C691.308 413.95 690.526 415.698 689.298 417.173C688.081 418.65 686.535 419.715 684.661 420.369C682.787 421.023 680.743 421.159 678.53 420.779C676.316 420.399 674.425 419.586 672.857 418.341C671.299 417.098 670.18 415.575 669.499 413.772C668.817 411.969 668.645 410.057 668.982 408.037ZM671.04 408.375C670.762 410.045 670.917 411.588 671.507 413.004C672.106 414.422 673.053 415.602 674.347 416.546C675.642 417.489 677.167 418.112 678.924 418.413C680.67 418.713 682.308 418.634 683.836 418.175C685.364 417.717 686.636 416.917 687.651 415.777C688.666 414.636 689.313 413.231 689.591 411.561C689.869 409.891 689.714 408.348 689.125 406.932C688.535 405.516 687.594 404.336 686.299 403.393C685.015 402.451 683.494 401.829 681.738 401.528C679.981 401.226 678.339 401.304 676.811 401.763C675.282 402.222 674.006 403.02 672.98 404.159C671.965 405.299 671.319 406.705 671.04 408.375Z" />
              <path d="M686.87 434.115L684.77 442.44C684.397 443.919 683.809 445.115 683.004 446.029C682.2 446.942 681.251 447.543 680.158 447.83C679.075 448.121 677.92 448.107 676.693 447.788C675.466 447.469 674.448 446.913 673.638 446.119C672.825 445.336 672.284 444.343 672.013 443.139C671.74 441.946 671.793 440.6 672.171 439.101L673.707 433.009L664.863 430.71L665.411 428.537L686.87 434.115ZM674.182 439.219C673.896 440.353 673.85 441.356 674.045 442.227C674.24 443.098 674.621 443.801 675.188 444.337C675.761 444.885 676.457 445.266 677.275 445.478C678.103 445.694 678.883 445.702 679.613 445.503C680.341 445.315 680.986 444.884 681.55 444.21C682.12 443.549 682.553 442.636 682.846 441.471L684.287 435.758L675.622 433.506L674.182 439.219Z" />
              <path d="M653.273 484.018C653.671 483.065 654.271 482.284 655.073 481.675C655.875 481.066 656.77 480.69 657.758 480.547C658.755 480.408 659.709 480.535 660.619 480.926C661.577 481.338 662.356 481.951 662.955 482.765C663.56 483.593 663.927 484.511 664.054 485.52C664.187 486.542 664.054 487.53 663.657 488.483C663.259 489.436 662.655 490.215 661.843 490.82C661.041 491.429 660.139 491.796 659.136 491.921C658.139 492.06 657.161 491.923 656.203 491.511C655.293 491.12 654.54 490.512 653.944 489.688C653.354 488.878 652.997 487.964 652.874 486.946C652.747 485.937 652.88 484.961 653.273 484.018Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M548.02 627.07C596.359 590.68 634.156 541.745 657.442 485.403L659.293 486.164C635.872 542.833 597.853 592.057 549.225 628.664C500.598 665.271 443.157 687.91 382.935 694.202C322.713 700.494 261.934 690.206 206.981 664.419C152.028 638.633 104.93 598.301 70.6323 547.66L72.291 546.541C106.389 596.887 153.209 636.98 207.833 662.612C262.456 688.244 322.869 698.469 382.727 692.216C442.584 685.962 499.681 663.46 548.02 627.07Z" />
            </svg>
          </Box>
        </BackToTop>
      </Box>
    </Grid>
  )
}

export default SlugContent;