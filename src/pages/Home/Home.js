import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Button, Divider, TextField, Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import HomeLogic from './HomeLogic';
import Navbar from '../../components/Navbar/Navbar';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import EmptySpace from '../../components/EmptySpace/EmptySpace';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';

function Home() {
  const {
    onSaveImg,
    pageStatus,
    onSubmit,
    dontParticipate,
    phoneRegistration,
    phoneErrorMessage,
    imageViewerProps,
    onStartImgUpload,
    uploadMode,
  } = HomeLogic();

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus === 'register')
    return (
      <SectionContainer fullPage centered maxWidth='xs'>
        <form onSubmit={onSubmit}>
          <Typography variant='h1' align='center'>
            Shot gratos !
          </Typography>
          <EmptySpace under='h1' />
          <Typography variant='body1' align='center'>
            Chaque demi-heure, notre barman en chef offre un shot à celui qui a
            prit la meilleure photo.
          </Typography>
          <EmptySpace under='body1' />
          <TextField
            {...phoneRegistration}
            fullWidth
            placeholder='Num de tel (+4176...)'
          />
          <Typography
            variant='body2'
            sx={{ color: 'red', mt: 1, textAlign: 'center' }}
          >
            {phoneErrorMessage}
          </Typography>
          <Divider variant='middle' sx={{ my: 3 }} />
          <Button onClick={dontParticipate} fullWidth variant='contained'>
            Je ne participe pas
          </Button>
        </form>
      </SectionContainer>
    );

  if (pageStatus === 'idle')
    return (
      <>
        <Navbar>
          <ImageUploader
            onStartUpload={onStartImgUpload}
            onFinishUpload={onSaveImg}
            uploadMode={'gallery'}
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
