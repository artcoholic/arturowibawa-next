import React from 'react';
import { Provider, LikeButton } from '@lyket/react';
import { Wrapper, Button, Count, Tooltip } from './styles';

const Zapped = ({ id }) => {
  return (
    <Provider
      apiKey="pt_24f41aec661cfe264e7a4a77bcb0de"
    >
      <LikeButton
        namespace="thoughts"
        id={id}
        hideCounterIfLessThan={1}
      >
        {({
          handlePress,
          totalLikes,
          userLiked,
          isLoading,
          isCounterVisible,
        }) => (
          <Wrapper>
            {isCounterVisible && <Count>{totalLikes}</Count>}
            <Button
              onClick={handlePress}
              disabled={isLoading}
              userLiked={userLiked}
            >
              <Tooltip
                className="tooltip"
                bg="bg.inverseTertiary"
                color="content.tertiary"
              >
                {userLiked ? 'Unzap' : 'Zap!'}
              </Tooltip>
              <svg id="thunder-svg" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <g id="Group" fill="none" fillRule="evenodd">
                  <path d="M15.4095 2.60279C15.9308 1.944 15.4386 1 14.5737 1H7.85707C7.48186 1 7.13531 1.19159 6.94855 1.50227L1.86587 9.95766C1.46512 10.6243 1.96924 11.4554 2.77438 11.4554H6.20299L2.97289 19.5203C2.50643 20.5406 3.76791 21.473 4.61626 20.735L17.7253 8.33119H10.8764L15.4095 2.60279Z" className="thunder" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  <circle id="main-circ" fill="#E2264D" opacity="0" cx="29" cy="29" r="2" />

                  <g id="grp7" opacity="0" transform="translate(8 8)">
                    <circle id="oval1" fill="#9CD8C3" cx="0" cy="3" r="2" />
                    <circle id="oval2" fill="#8CE8C3" cx="3" cy="0" r="2" />
                  </g>

                  <g id="grp6" opacity="0" transform="translate(0 29)">
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="2" cy="-2" r="2" />
                  </g>

                  <g id="grp3" opacity="0" transform="translate(62 29)">
                    <circle id="oval2" fill="#9CD8C3" cx="-4" cy="2" r="2" />
                    <circle id="oval1" fill="#8CE8C3" cx="-4" cy="-2" r="2" />
                  </g>

                  <g id="grp2" opacity="0" transform="translate(48 6)">
                    <circle id="oval2" fill="#CC8EF5" cx="3" cy="5" r="2" />
                    <circle id="oval1" fill="#CC8EF5" cx="0" cy="2" r="2" />
                  </g>

                  <g id="grp5" opacity="0" transform="translate(8 46)">
                    <circle id="oval1" fill="#91D2FA" cx="3" cy="5" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="0" cy="2" r="2" />
                  </g>

                  <g id="grp4" opacity="0" transform="translate(48 48)">
                    <circle id="oval1" fill="#F48EA7" cx="3" cy="0" r="2" />
                    <circle id="oval2" fill="#F48EA7" cx="0" cy="3" r="2" />
                  </g>

                  <g id="grp1" opacity="0" transform="translate(29)">
                    <circle id="oval1" fill="#9FC7FA" cx="-2" cy="2" r="2" />
                    <circle id="oval2" fill="#9FC7FA" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp8" opacity="0" transform="translate(29 56)">
                    <circle id="oval2" fill="#9FC7FA" cx="-2" cy="2" r="2" />
                    <circle id="oval1" fill="#9FC7FA" cx="2" cy="2" r="2" />
                  </g>
                </g>
              </svg>
            </Button>
          </Wrapper>
        )}
      </LikeButton>
    </Provider>
  )
}

export default Zapped;
