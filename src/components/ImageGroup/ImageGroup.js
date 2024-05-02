import { Box, Container, Typography } from '@mui/material';
import React from 'react';

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
                alt='img'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

export default ImageGroup;
