import { Box, LinearProgress, Typography } from '@mui/material';
import {
  TiTimes,
  TiChevronLeft,
  TiArrowRepeat,
  TiArrowForward,
} from 'react-icons/ti';
import Webcam from 'react-webcam';

import MoriCamLogic from './MoriCamLogic';

function MoriCam({ onCloseCam, open, onSaveImg }) {
  const {
    capture,
    discard,
    webcamProps,
    imgSrc,
    switchCamera,
    saveFile,
    uploading,
  } = MoriCamLogic({ onSaveImg });

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
          {uploading && (
            <LinearProgress
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
              }}
              color='primary'
            />
          )}
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
              objectFit: 'cover',
              display: imgSrc ? 'none' : 'inline',
            }}
            {...webcamProps}
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
                  objectFit: 'cover',
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
                  display: uploading ? 'none' : 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={discard}
              >
                <TiTimes color='white' size={40} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  display: uploading ? 'none' : 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    color: 'white',
                    fontSize: '2rem',
                    width: '100%',
                    py: 12,
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    flexDirection: 'row',
                  }}
                  onClick={saveFile}
                >
                  <Typography
                    color='white'
                    textTransform='uppercase'
                    fontWeight={700}
                    fontSize={35}
                  >
                    Envoyer
                  </Typography>
                  <TiArrowForward
                    color='white'
                    size={45}
                    style={{ marginLeft: 5 }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
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
                onClick={switchCamera}
              >
                <TiArrowRepeat color='white' size={40} />
              </Box>
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
            </>
          )}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: 'white',
              width: '80px',
              height: '80px',
              display: uploading ? 'none' : 'flex',
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
