import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Box, Button } from '@mui/material';

import Loading from '../Loading/Loading';
import Slider from 'react-slick';
import {
  TiArrowBack,
  TiChevronLeft,
  TiBackspace,
  TiDownload,
} from 'react-icons/ti';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Palette from '../../theme/palette';
import TimeCarouselLogic from './TimeCarouselLogic';

function TimeCarousel() {
  const {
    pageStatus,
    quitPage,
    images,
    fullScreen,
    toggleFullScreen,
    slidId,
    onSwipeImg,
    imgName,
  } = TimeCarouselLogic();

  const palette = Palette();

  if (pageStatus === 'loading') return <Loading />;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    initialSlide: slidId,
    onSwipe: onSwipeImg,
  };

  console.log(imgName);

  if (pageStatus === 'idle')
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
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
                bottom: 15,
                right: 15,
                zIndex: 100,
              }}
              component='a'
              href={images[slidId].url}
              download={imgName}
            >
              <TiDownload color={palette.GHOST_WHITE} size={30} />
            </Button>
          </>
        )}
        <Box onClick={toggleFullScreen}>
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
                      objectFit: 'cover',
                    }}
                  />
                </div>
              );
            })}
          </Slider>
        </Box>
      </Box>
    );
}
export default TimeCarousel;
