import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import MoriCam from '../../components/MoriCam/MoriCam';
import HomeLogic from './HomeLogic';

function Home() {
  const { onCloseCam, openCam, onSaveImg, pageStatus } = HomeLogic();

  return (
    <>
      <Typography variant='h1' align='center'>
        Home
      </Typography>
      <ImageUploader />
      <button onClick={openCam}>Open Camera</button>
      <MoriCam
        onCloseCam={onCloseCam}
        open={pageStatus === 'cam'}
        onSaveImg={onSaveImg}
      />
    </>
  );
}
export default Home;
