import React from 'react';

import { Box } from '@mui/material';
import { TiCamera, TiImage } from 'react-icons/ti';

import MoriCam from '../MoriCam/MoriCam';
import ImageUploaderLogic from './ImageUploaderLogic';
import Palette from '../../theme/palette';

function ImageUploader({ onStartUpload, onFinishUpload, uploadMode }) {
  const { uploadFile, openCam, onCloseCam, camIsOpen, inputCamSupported } =
    ImageUploaderLogic({ onStartUpload, onFinishUpload });

  const palette = Palette();

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
          onChange={uploadFile}
          multiple
          accept='image/jpg, image/jpeg'
          style={{ display: 'none' }} // Hide the actual input
          id='contained-button-file' // Add an id to reference it with the label
          capture={false}
        />
        <Box
          component='label'
          htmlFor='contained-button-file'
          sx={{
            display: 'flex',
            py: 1,
            pl: 4,
            pr: uploadMode === 'both' ? 3 : 4,
            cursor: 'pointer',
          }}
        >
          {uploadMode === 'cam' ? (
            <TiCamera color={palette.GHOST_WHITE} size={30} />
          ) : (
            <TiImage color={palette.GHOST_WHITE} size={30} />
          )}
        </Box>

        {uploadMode === 'both' && (
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
                pl: uploadMode === 'both' ? 3 : 4,
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
              onSaveImg={onFinishUpload}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default ImageUploader;
