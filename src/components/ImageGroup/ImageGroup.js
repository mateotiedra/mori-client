import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import Palette from '../../theme/palette';

function ImageGroup({ images, title }) {
  const palette = Palette();
  return (
    <Container
      maxWidth='xs'
      sx={{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 'calc(100% - 10rem)',
          height: 'calc(100% + 5rem)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px ' + palette.GHOST_WHITE + ' solid',
          borderRadius: '10px',
          px: 1.5,
          py: 1,
        }}
      >
        <Typography variant='body2'>{title}</Typography>
      </Box>
      {images.map((image, index) => {
        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '100px',
              height: '180px',
              overflow: 'hidden',
              borderRadius: '10px',
            }}
          >
            <img
              src={image.url}
              alt='image'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        );
      })}
    </Container>
  );
}

export default ImageGroup;
