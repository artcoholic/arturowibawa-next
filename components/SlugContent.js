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
  a {
    position: relative;
    transition: transform 1000ms ${props => props.theme.ease.Smooth};
    text-decoration: underline dotted;
    text-decoration-thickness: 1px;
    white-space: nowrap;
    font-family: var(--eina-regular);
    color: ${props => props.theme.colors.content.primary};
    &:hover {
      &:after {
        transform: scaleX(1);
        transform-origin: 0%;
      }
    }
    &:after {
      content: '';
      background: ${props => props.theme.colors.content.primary};
      transition: transform 250ms ${props => props.theme.ease.Smooth};
      height: 100%;
      left: 0;
      bottom: 0;
      width: 100%;
      transform: scaleX(0);
      transform-origin: 100%;
      position: absolute;
    }
  }
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
    transition: transform 500ms ${props => props.theme.ease.It};
  }
  .arrowUp > svg {
    fill: ${props => props.theme.colors.bg.primary};
  }
  .textPath {
    animation: ${rotation} 30s linear infinite;
    svg {
      fill: ${props => props.theme.colors.content.inverseSecondary};
      transform: scale(1);
    }
  }
  &:hover {
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
                      bg="bg.placeholder"
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
            <ArrowUpThick size="100%" strokeWidth={0.5} />
          </Box>
          <Box className="textPath" size={["50vw", "25vw"]}>
            <svg width="100%" height="100%" viewBox="0 0 696 696" xmlns="http://www.w3.org/2000/svg">
              <path d="M320.249 652.545L307.925 650.954C300.487 649.993 296.56 653.388 295.883 658.628C295.204 663.886 298.279 667.497 301.612 668.168L301.577 668.438C298.377 668.867 295.666 670.958 295.108 675.285C294.435 680.492 297.336 684.785 304.098 685.658L315.779 687.167L320.249 652.545ZM316.721 654.977L314.999 668.315L305.701 667.114C301.052 666.514 298.399 662.975 298.909 659.019C299.372 655.435 302.217 653.104 307.559 653.794L316.721 654.977ZM314.637 671.121L312.985 683.918L304.464 682.818C299.731 682.207 297.66 679.345 298.134 675.676C298.625 671.872 301.738 669.456 305.829 669.984L314.637 671.121Z" />
              <path d="M284.251 647.071L278.056 656.354L263.843 652.763L262.8 641.652L259.561 640.834L263.323 677.79L266.628 678.625L287.49 647.89L284.251 647.071ZM276.363 658.88L266.105 674.221L265.874 674.163L264.133 655.79L276.363 658.88Z" />
              <path d="M215.073 649.9C213.805 656.303 216.897 662.83 223.823 665.527C232.035 668.724 240.422 664.472 244.386 654.291C248.351 644.109 245.048 635.305 236.836 632.107C229.91 629.411 223.212 632.144 219.823 637.702L222.809 638.864C225.452 634.754 230.649 632.917 235.747 634.903C241.91 637.303 245.031 644.133 241.511 653.171C238.005 662.177 231.074 665.131 224.911 662.731C219.813 660.746 217.232 655.863 218.059 651.063L215.073 649.9Z" />
              <path d="M212.957 622.298L210.15 620.788L204.78 630.77L198.21 633.159L194.659 612.453L191.236 610.612L195.419 634.173L174.637 641.322L178.329 643.309L202.248 634.828L202.518 634.973L193.611 651.53L196.418 653.04L212.957 622.298Z" />
              <path d="M148.558 620.65L139.891 613.775L159.804 588.668L157.307 586.688L137.393 611.794L128.726 604.92L126.947 607.164L146.779 622.893L148.558 620.65Z" />
              <path d="M107.055 563.511C99.2477 571.155 98.6296 580.538 104.806 586.847C110.971 593.145 120.377 592.714 128.173 585.083C135.968 577.451 136.611 568.068 130.434 561.759C124.257 555.449 114.863 555.868 107.055 563.511ZM109.226 565.728C115.925 559.146 123.473 558.937 128.29 563.858C133.119 568.791 132.702 576.332 126.015 582.878C119.291 589.46 111.743 589.645 106.95 584.749C102.133 579.828 102.514 572.298 109.226 565.728Z" />
              <path d="M74.5408 546.221L68.4031 537.018L95.0639 519.238L93.2955 516.586L66.6346 534.366L60.4969 525.162L58.1144 526.751L72.1584 547.81L74.5408 546.221Z" />
              <path d="M52.5876 479.099C42.8101 483.976 39.3407 492.716 43.2817 500.618C47.215 508.504 56.2991 510.982 66.0613 506.113C75.8235 501.244 79.3157 492.512 75.3748 484.61C71.4339 476.709 62.365 474.223 52.5876 479.099ZM53.9722 481.876C62.3692 477.668 69.6166 479.787 72.6902 485.949C75.7715 492.127 73.0584 499.176 64.6843 503.352C56.2644 507.552 49.0247 505.41 45.9663 499.279C42.8926 493.116 45.5676 486.068 53.9722 481.876Z" />
              <path d="M63.4895 459.476L62.4302 456.47L49.8422 460.905L47.14 453.237C44.6871 446.276 38.997 444.232 33.2416 446.26C27.4862 448.289 24.3502 453.442 26.8202 460.451L30.5648 471.078L63.4895 459.476ZM47.1414 461.857L32.2063 467.12L29.5494 459.58C27.7139 454.371 29.9594 450.742 34.284 449.219C38.5925 447.7 42.649 449.108 44.4675 454.269L47.1414 461.857Z" />
              <path d="M37.0841 382.156C36.6975 378.614 33.5042 376.065 29.9609 376.435C26.4194 376.821 23.8533 380.016 24.2399 383.558C24.6266 387.099 27.8217 389.666 31.3631 389.279C34.9027 388.875 37.4707 385.697 37.0841 382.156Z" />
              <path d="M43.6388 321.547L45.1822 309.217C46.1137 301.775 42.7042 297.861 37.461 297.204C32.2009 296.546 28.602 299.634 27.9438 302.97L27.6732 302.937C27.2319 299.738 25.1308 297.035 20.801 296.493C15.5916 295.841 11.3098 298.758 10.463 305.524L9 317.211L43.6388 321.547ZM41.1932 318.028L27.8485 316.358L29.0129 307.055C29.5952 302.404 33.1243 299.737 37.082 300.232C40.6677 300.681 43.0097 303.516 42.3407 308.861L41.1932 318.028ZM25.0409 316.006L12.2374 314.404L13.3044 305.879C13.8972 301.143 16.7518 299.061 20.422 299.521C24.2275 299.997 26.6563 303.101 26.1439 307.194L25.0409 316.006Z" />
              <path d="M48.9716 285.527L39.6653 279.368L43.2007 265.142L54.3076 264.055L55.1133 260.813L18.172 264.718L17.3498 268.026L48.1658 288.77L48.9716 285.527ZM37.1328 277.685L21.7519 267.487L21.8095 267.255L40.1749 265.444L37.1328 277.685Z" />
              <path d="M45.8745 216.359C39.467 215.117 32.9519 218.234 30.2821 225.17C27.1164 233.394 31.401 241.765 41.5978 245.69C51.7946 249.615 60.586 246.278 63.7518 238.054C66.4215 231.118 63.6625 224.43 58.0915 221.062L56.9403 224.053C61.0613 226.68 62.9176 231.87 60.952 236.976C58.5762 243.148 51.7575 246.295 42.7061 242.811C33.6865 239.339 30.706 232.42 33.0819 226.248C35.0475 221.141 39.9201 218.542 44.7233 219.35L45.8745 216.359Z" />
              <path d="M73.4698 214.138L74.9691 211.325L64.9661 205.993L62.5521 199.433L83.2434 195.801L85.0715 192.372L61.5267 196.646L54.2974 175.891L52.3251 179.592L60.8987 203.477L60.7544 203.748L44.163 194.904L42.6637 197.717L73.4698 214.138Z" />
              <path d="M74.8686 149.733L81.7094 141.039L106.893 160.855L108.864 158.35L83.6805 138.534L90.5213 129.84L88.2708 128.069L72.6181 147.962L74.8686 149.733Z" />
              <path d="M131.846 108.008C124.172 100.23 114.787 99.6482 108.501 105.849C102.228 112.038 102.695 121.443 110.356 129.209C118.018 136.975 127.403 137.581 133.688 131.38C139.974 125.179 139.519 115.786 131.846 108.008ZM129.637 110.187C136.246 116.861 136.484 124.408 131.582 129.244C126.667 134.092 119.125 133.704 112.552 127.042C105.944 120.344 105.73 112.797 110.608 107.985C115.51 103.149 123.041 103.501 129.637 110.187Z" />
              <path d="M149.009 75.4278L158.188 69.2545L176.071 95.8463L178.716 94.0675L160.834 67.4757L170.013 61.3024L168.415 58.9262L147.411 73.0515L149.009 75.4278Z" />
              <path d="M216.045 53.2143C211.13 43.4558 202.377 40.0203 194.491 43.9918C186.62 47.9556 184.177 57.0493 189.084 66.7925C193.99 76.5358 202.736 79.9942 210.622 76.0227C218.508 72.0512 220.959 62.9728 216.045 53.2143ZM213.274 54.6097C217.514 62.9903 215.423 70.2458 209.273 73.3433C203.107 76.4484 196.048 73.7627 191.839 65.4048C187.607 57.0013 189.72 49.7533 195.84 46.6712C201.991 43.5737 209.05 46.2214 213.274 54.6097Z" />
              <path d="M235.711 64.0414L238.713 62.9704L234.228 50.3997L241.886 47.6678C248.838 45.1879 250.859 39.49 248.809 33.7425C246.758 27.995 241.593 24.879 234.593 27.3761L223.981 31.1618L235.711 64.0414ZM233.266 47.7026L227.946 32.7879L235.475 30.1019C240.677 28.2462 244.314 30.4777 245.855 34.7964C247.39 39.099 245.997 43.1609 240.844 44.9993L233.266 47.7026Z" />
              <path d="M312.929 37.3368C316.469 36.9365 319.006 33.7334 318.622 30.1915C318.222 26.6516 315.017 24.0978 311.477 24.4982C307.937 24.8985 305.383 28.1035 305.784 31.6435C306.201 35.1815 309.389 37.7371 312.929 37.3368Z" />
              <path d="M373.563 43.6553L385.899 45.151C393.344 46.0537 397.245 42.629 397.881 37.3833C398.519 32.1207 395.417 28.5337 392.078 27.8886L392.111 27.6178C395.308 27.1641 398.003 25.0526 398.528 20.7207C399.16 15.5089 396.226 11.2384 389.458 10.4177L377.765 9L373.563 43.6553ZM377.072 41.1961L378.691 27.8451L387.998 28.9735C392.651 29.5377 395.332 33.0564 394.852 37.0161C394.417 40.6034 391.591 42.9565 386.244 42.3081L377.072 41.1961ZM379.031 25.0361L380.585 12.2265L389.113 13.2605C393.851 13.835 395.944 16.6815 395.499 20.3534C395.037 24.1608 391.943 26.6015 387.848 26.105L379.031 25.0361Z" />
              <path d="M409.603 48.8485L415.726 39.5184L429.966 42.9987L431.095 54.1013L434.341 54.8945L430.293 17.9686L426.981 17.1592L406.357 48.0553L409.603 48.8485ZM417.399 36.9794L427.538 21.5592L427.769 21.6158L429.652 39.9741L417.399 36.9794Z" />
              <path d="M478.757 45.4845C479.975 39.0723 476.832 32.5693 469.886 29.9264C461.65 26.7925 453.296 31.1095 449.41 41.3214C445.525 51.5333 448.896 60.3117 457.132 63.4456C464.078 66.0885 470.755 63.3036 474.102 57.7196L471.107 56.58C468.495 60.7112 463.313 62.5875 458.199 60.6417C452.018 58.2898 448.845 51.4834 452.294 42.4185C455.731 33.3856 462.638 30.3783 468.819 32.7303C473.933 34.6761 476.551 39.5386 475.762 44.3449L478.757 45.4845Z" />
              <path d="M481.086 73.0705L483.905 74.5589L489.198 64.5354L495.749 62.096L499.46 82.773L502.897 84.5878L498.532 61.0598L519.258 53.7502L515.55 51.7921L491.698 60.4582L491.427 60.3149L500.206 43.6894L497.387 42.201L481.086 73.0705Z" />
              <path d="M545.496 74.2202L554.217 81.0273L534.498 106.288L537.011 108.249L556.729 82.9887L565.449 89.7958L567.211 87.5385L547.258 71.9629L545.496 74.2202Z" />
              <path d="M587.44 131.036C595.189 123.332 595.734 113.944 589.509 107.683C583.295 101.434 573.892 101.937 566.156 109.628C558.42 117.32 557.851 126.707 564.076 132.969C570.301 139.23 579.692 138.739 587.44 131.036ZM585.253 128.836C578.605 135.47 571.059 135.737 566.203 130.854C561.336 125.958 561.695 118.414 568.332 111.816C575.004 105.182 582.55 104.939 587.381 109.798C592.236 114.682 591.913 122.214 585.253 128.836Z" />
              <path d="M620.088 148.072L626.297 157.228L599.774 175.214L601.563 177.852L628.086 159.866L634.294 169.022L636.664 167.415L622.458 146.465L620.088 148.072Z" />
              <path d="M642.56 215.021C652.299 210.069 655.701 201.302 651.699 193.432C647.705 185.576 638.602 183.168 628.878 188.113C619.153 193.057 615.729 201.817 619.731 209.687C623.733 217.558 632.821 219.974 642.56 215.021ZM641.154 212.256C632.79 216.528 625.526 214.466 622.405 208.327C619.276 202.174 621.934 195.104 630.276 190.863C638.663 186.598 645.919 188.684 649.025 194.792C652.146 200.93 649.526 207.999 641.154 212.256Z" />
              <path d="M631.811 234.728L632.893 237.726L645.447 233.193L648.208 240.841C650.715 247.783 656.421 249.782 662.16 247.709C667.9 245.637 670.996 240.459 668.471 233.469L664.645 222.872L631.811 234.728ZM648.14 232.221L663.034 226.842L665.749 234.362C667.625 239.556 665.408 243.202 661.095 244.759C656.798 246.311 652.731 244.934 650.873 239.788L648.14 232.221Z" />
              <path d="M658.814 311.844C659.228 315.382 662.441 317.907 665.981 317.51C669.52 317.096 672.061 313.881 671.647 310.342C671.233 306.804 668.018 304.263 664.48 304.677C660.943 305.108 658.4 308.306 658.814 311.844Z" />
              <path d="M652.729 372.501L651.281 384.842C650.407 392.291 653.847 396.179 659.095 396.794C664.36 397.412 667.935 394.296 668.567 390.955L668.838 390.987C669.304 394.182 671.426 396.868 675.76 397.377C680.974 397.988 685.233 395.038 686.028 388.267L687.4 376.568L652.729 372.501ZM655.202 376L668.559 377.567L667.466 386.878C666.92 391.534 663.412 394.229 659.45 393.764C655.861 393.343 653.497 390.526 654.125 385.176L655.202 376ZM671.369 377.897L684.185 379.401L683.184 387.933C682.627 392.673 679.789 394.777 676.115 394.346C672.306 393.899 669.854 390.814 670.334 386.717L671.369 377.897Z" />
              <path d="M647.675 408.562L657.029 414.649L653.603 428.902L642.505 430.074L641.725 433.323L678.635 429.132L679.431 425.817L648.455 405.313L647.675 408.562ZM659.574 416.312L675.033 426.391L674.978 426.623L656.627 428.577L659.574 416.312Z" />
              <path d="M651.307 477.702C657.724 478.895 664.215 475.727 666.831 468.771C669.933 460.523 665.584 452.185 655.357 448.34C645.13 444.494 636.365 447.899 633.263 456.147C630.647 463.103 633.457 469.77 639.054 473.094L640.182 470.095C636.041 467.5 634.145 462.325 636.071 457.203C638.399 451.013 645.193 447.813 654.271 451.227C663.317 454.629 666.351 461.525 664.023 467.715C662.097 472.837 657.245 475.474 652.435 474.703L651.307 477.702Z" />
              <path d="M623.73 480.138L622.253 482.962L632.297 488.216L634.762 494.757L614.099 498.549L612.298 501.993L635.809 497.536L643.198 518.234L645.142 514.519L636.384 490.7L636.526 490.428L653.185 499.143L654.663 496.319L623.73 480.138Z" />
              <path d="M622.831 544.552L616.057 553.299L590.721 533.678L588.769 536.198L614.106 555.819L607.332 564.565L609.597 566.319L625.095 546.305L622.831 544.552Z" />
              <path d="M566.178 586.715C573.912 594.434 583.302 594.943 589.539 588.693C595.764 582.456 595.225 573.055 587.503 565.349C579.782 557.642 570.392 557.109 564.155 563.359C557.917 569.608 558.445 578.997 566.178 586.715ZM568.37 584.52C561.71 577.897 561.414 570.352 566.278 565.478C571.155 560.592 578.7 560.922 585.324 567.532C591.984 574.179 592.256 581.724 587.416 586.574C582.551 591.448 575.018 591.154 568.37 584.52Z" />
              <path d="M549.268 619.428L540.136 625.673L522.048 599.22L519.417 601.019L537.505 627.472L528.373 633.716L529.99 636.08L550.885 621.792L549.268 619.428Z" />
              <path d="M482.406 642.16C487.396 651.881 496.176 655.248 504.031 651.216C511.87 647.191 514.243 638.079 509.261 628.374C504.279 618.669 495.507 615.278 487.652 619.311C479.797 623.343 477.416 632.44 482.406 642.16ZM485.166 640.744C480.861 632.396 482.896 625.125 489.022 621.98C495.163 618.827 502.243 621.458 506.517 629.783C510.814 638.153 508.756 645.418 502.66 648.547C496.534 651.692 489.455 649.099 485.166 640.744Z" />
              <path d="M462.657 631.487L459.664 632.581L464.245 645.116L456.609 647.907C449.676 650.441 447.699 656.154 449.794 661.886C451.889 667.617 457.078 670.693 464.059 668.142L474.641 664.274L462.657 631.487ZM465.228 647.806L470.664 662.679L463.156 665.423C457.968 667.319 454.314 665.116 452.74 660.809C451.172 656.519 452.533 652.446 457.672 650.568L465.228 647.806Z" />
              <path d="M385.648 658.788C382.111 659.216 379.599 662.439 380.01 665.977C380.438 669.514 383.662 672.043 387.199 671.615C390.736 671.187 393.265 667.963 392.837 664.426C392.392 660.891 389.185 658.36 385.648 658.788Z" />
            </svg>
          </Box>
        </BackToTop>
      </Box>
    </Grid>
  )
}

export default SlugContent;