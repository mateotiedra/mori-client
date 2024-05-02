import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { TextField, Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import HomeLogic from './HomeLogic';
import Navbar from '../../components/Navbar/Navbar';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import EmptySpace from '../../components/EmptySpace/EmptySpace';

function Home() {
  const {
    onSaveImg,
    pageStatus,
    onSubmit,
    phoneRegistration,
    phoneErrorMessage,
    ...homeLogic
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
        <Navbar>
          <ImageUploader onSaveImg={onSaveImg} />
        </Navbar>
        <EmptySpace />
        <ImageViewer
          images={homeLogic.latestImages}
          start={homeLogic.event.startAt}
          end={homeLogic.event.endAt}
          timeFrame={30}
        />
      </>
    );
}
export default Home;
