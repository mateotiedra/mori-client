import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { TextField, Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import HomeLogic from './HomeLogic';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  const {
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
        <Navbar />

        <ImageUploader onSaveImg={onSaveImg} />
      </>
    );
}
export default Home;
