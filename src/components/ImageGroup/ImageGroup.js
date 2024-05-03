import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HashLink as RouterLink } from 'react-router-hash-link';
import { Box, Container, Typography } from '@mui/material';

import 'react-lazy-load-image-component/src/effects/blur.css';

function ImageGroup({ images, title }) {
  return (
    <Container
      maxWidth='xs'
      sx={{
        px: 5,
        pb: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '1rem',
        }}
      >
        <Typography variant='h1' sx={{ width: '100%' }}>
          {title}
        </Typography>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              flex: '1',
              minWidth: '90px',
              height: '180px',
              overflow: 'hidden',
              borderRadius: '10px',
            }}
            component={RouterLink}
            to={'/image/' + image.uuid}
          >
            <LazyLoadImage
              src={image.url}
              alt='img'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default ImageGroup;
