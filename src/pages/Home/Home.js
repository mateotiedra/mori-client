import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { TextField, Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import HomeLogic from './HomeLogic';
import Navbar from '../../components/Navbar/Navbar';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import EmptySpace from '../../components/EmptySpace/EmptySpace';
import Loading from '../Loading/Loading';

function Home() {
  const {
    onSaveImg,
    pageStatus,
    onSubmit,
    phoneRegistration,
    phoneErrorMessage,
    imageViewerProps,
    onStartImgUpload,
  } = HomeLogic();

  if (pageStatus === 'loading') return <Loading />;

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
          <ImageUploader
            onStartUpload={onStartImgUpload}
            onFinishUpload={onSaveImg}
          />
        </Navbar>
        <EmptySpace />
        <ImageViewer
          start={imageViewerProps.start}
          end={imageViewerProps.end}
          images={imageViewerProps.images}
          timeFrame={30}
        />
      </>
    );
}
export default Home;
