import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Box, Button } from '@mui/material';

import TimeCarouselLogic from './TimeCarouselLogic';
import Loading from '../Loading/Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TiDownload } from 'react-icons/ti';

function TimeCarousel() {
  const { pageStatus, onQuit, images } = TimeCarouselLogic();

  if (pageStatus === 'loading') return <Loading />;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
  };
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
    );
}
export default TimeCarousel;
