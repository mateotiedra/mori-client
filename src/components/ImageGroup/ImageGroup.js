import React from 'react';

import { Box, Container, Typography } from '@mui/material';

function ImageGroup({ images, title, clickImage }) {
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
        <Typography variant='h3' sx={{ width: '100%' }}>
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
              textDecoration: 'none',
            }}
            onClick={clickImage(image.uuid)}
          >
            <Box
              component='img'
              src={image.url}
              alt='w'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                color: 'transparent',
                textShadow: '0 0 0 transparent',
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default ImageGroup;
