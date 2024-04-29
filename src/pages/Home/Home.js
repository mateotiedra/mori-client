import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { TextField, Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import MoriCam from '../../components/MoriCam/MoriCam';
import HomeLogic from './HomeLogic';

function Home() {
  const {
    onCloseCam,
    openCam,
    onSaveImg,
    pageStatus,
    onSubmit,
    phoneRegistration,
    phoneErrorMessage,
  } = HomeLogic();

  if (pageStatus === 'loading')
    return (
      <Typography variant='h1' align='center'>
        Loading...
      </Typography>
    );

  if (pageStatus === 'register')
    return (
      <form onSubmit={onSubmit}>
        <Typography variant='h1' align='center'>
          Home
        </Typography>
        <TextField {...phoneRegistration} />
        <Typography sx={{ color: 'red' }}>{phoneErrorMessage}</Typography>
      </form>
    );

  if (pageStatus === 'idle')
    return (
      <>
        <Typography variant='h1' align='center'>
          Home
        </Typography>
        <ImageUploader onSaveImg={onSaveImg} />
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
