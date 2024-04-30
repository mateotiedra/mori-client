import React from 'react';

import { Box, Button, Divider } from '@mui/material';
import { TiCamera, TiImage } from 'react-icons/ti';

import MoriCam from '../MoriCam/MoriCam';
import ImageUploaderLogic from './ImageUploaderLogic';
import Palette from '../../theme/palette';

function ImageUploader({ onSaveImg }) {
  const {
    saveFiles,
    uploadFile,
    openCam,
    onCloseCam,
    camIsOpen,
    inputCamSupported,
  } = ImageUploaderLogic({ onSaveImg });

  const palette = Palette();

  const flexCenterContainerSx = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 1,
          border: '2px ' + palette.GHOST_WHITE + ' solid',
        }}
      >
        <input
          type='file'
          onChange={saveFiles}
          multiple
          accept='image/jpg, image/jpeg, image/png'
          style={{ display: 'none' }} // Hide the actual input
          id='contained-button-file' // Add an id to reference it with the label
        />
        <Box
          component='label'
          htmlFor='contained-button-file'
          sx={{
            display: 'flex',
            py: 1,
            pl: 4,
            pr: inputCamSupported ? 4 : 3,
            cursor: 'pointer',
          }}
        >
          {inputCamSupported ? (
            <TiCamera color={palette.GHOST_WHITE} size={30} />
          ) : (
            <TiImage color={palette.GHOST_WHITE} size={30} />
          )}
        </Box>
        {!inputCamSupported && (
          <>
            <Box
              sx={{
                width: '2px',
                height: 27,
                borderRadius: 1,
                backgroundColor: palette.GHOST_WHITE,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                py: 1,
                pl: 3,
                pr: 4,
                cursor: 'pointer',
              }}
              onClick={openCam}
            >
              <TiCamera color={palette.GHOST_WHITE} size={30} />
            </Box>
            <MoriCam
              onCloseCam={onCloseCam}
              open={camIsOpen}
              onSaveImg={onSaveImg}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default ImageUploader;
