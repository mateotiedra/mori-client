import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Box, Button, Typography } from '@mui/material';

import Loading from '../../pages/Loading/Loading';
import Slider from 'react-slick';
import { TiChevronLeft, TiDownload } from 'react-icons/ti';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Palette from '../../theme/palette';
import TimeCarouselLogic from './TimeCarouselLogic';

function TimeCarousel(props) {
  const {
    pageStatus,
    quitPage,
    images,
    fullScreen,
    toggleFullScreen,
    slidId,
    onSwipeImg,
    downloadImg,
    increaseSecret,
    displaySecret,
    ownerPhone,
  } = TimeCarouselLogic(props);

  const palette = Palette();

  if (pageStatus === 'loading') return <Loading />;

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    initialSlide: slidId,
    afterChange: onSwipeImg,
  };

  if (pageStatus === 'idle')
    return (
      <Box
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 100,
          backgroundColor: palette.GHOST_BLACK,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              height: 70,
              width: 150,
            }}
            onClick={increaseSecret}
          />

          {!fullScreen && (
            <>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  position: 'absolute',
                  top: 15,
                  left: 15,
                  zIndex: 100,
                }}
                onClick={quitPage}
              >
                <TiChevronLeft color={palette.GHOST_WHITE} size={30} />
              </Button>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  zIndex: 100,
                }}
                onClick={downloadImg}
              >
                <TiDownload color={palette.GHOST_WHITE} size={30} />
              </Button>
            </>
          )}
          <Box onClick={toggleFullScreen}>
            {displaySecret ? (
              <Box
                sx={{
                  height: '100vh',
                  width: '100vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography component='a' href={'tel:' + ownerPhone}>
                  {ownerPhone}
                </Typography>
              </Box>
            ) : (
              <Slider {...sliderSettings}>
                {images.map((image, index) => {
                  return (
                    <div key={index}>
                      <img
                        key={index}
                        src={image.url}
                        alt='img'
                        style={{
                          width: '100vw',
                          height: '100vh',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            )}
          </Box>
        </Box>
      </Box>
    );
}
export default TimeCarousel;
