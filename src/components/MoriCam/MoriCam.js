import { Box, Typography } from '@mui/material';
import { TiTimes, TiChevronLeft } from 'react-icons/ti';
import Webcam from 'react-webcam';

import MoriCamLogic from './MoriCamLogic';

function MoriCam({ onCloseCam, open }) {
  const { capture, discard, webcamRef, imgSrc } = MoriCamLogic();

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'black',
          overflow: 'hidden',
          display: open ? 'inline' : 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h3' color='white'>
            Caméra en attente...
          </Typography>
          <Webcam
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              display: imgSrc ? 'none' : 'inline',
            }}
            ref={webcamRef}
          />

          {imgSrc ? (
            <>
              <img
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
                src={imgSrc}
                alt='captured'
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'white',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={discard}
              >
                <TiTimes color='white' size={40} />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                backgroundColor: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                position: 'absolute',
                left: '50%',
                bottom: '70px',
                transform: 'translate(-50%, 0)',
              }}
              onClick={capture}
            />
          )}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: 'white',
              width: '80px',
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              discard();
              onCloseCam();
            }}
          >
            <TiChevronLeft color='white' size={40} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MoriCam;
