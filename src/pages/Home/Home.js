import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import {
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';
import HomeLogic from './HomeLogic';
import Navbar from '../../components/Navbar/Navbar';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import EmptySpace from '../../components/EmptySpace/EmptySpace';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Countdown from '../../components/Countdown/Countdown';
import Loading from '../Loading/Loading';
import TimeCarousel from '../../components/TimeCarousel/TimeCarousel';

function RegisterPage({
  onSubmit,
  dontParticipate,
  phoneRegistration,
  phoneErrorMessage,
}) {
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
}

function HeaderSection({ eventName, eventEnd }) {
  return (
    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: 5,
      }}
    >
      <Typography
        variant='h1'
        sx={{
          width: '100%',
          textAlign: 'right',
        }}
      >
        {eventName}
      </Typography>
      <Countdown end={eventEnd} sx={{ width: '100%', textAlign: 'right' }} />
    </Container>
  );
}

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
    eventName,
    eventEnd,
    toggleTimeCarousel,
    loadMoreImages,
    loadingMoreImages,
  } = HomeLogic();

  if (pageStatus === 'loading' || pageStatus === 'loading-img')
    return (
      <Loading
        message={
          pageStatus.includes('img')
            ? 'Envoie des images/vidéos en cours...'
            : null
        }
      />
    );

  if (pageStatus === 'register')
    return (
      <RegisterPage
        onSubmit={onSubmit}
        dontParticipate={dontParticipate}
        phoneRegistration={phoneRegistration}
        phoneErrorMessage={phoneErrorMessage}
      />
    );
  return (
    <>
      {pageStatus === 'time-carousel' ? (
        <TimeCarousel
          images={imageViewerProps.images}
          toggleTimeCarousel={toggleTimeCarousel}
          loadMoreImages={loadMoreImages}
        />
      ) : (
        <Navbar>
          <ImageUploader
            onStartUpload={onStartImgUpload}
            onFinishUpload={onSaveImg}
            uploadMode={uploadMode}
          />
        </Navbar>
      )}
      <EmptySpace />
      <HeaderSection eventName={eventName} eventEnd={eventEnd} />
      <EmptySpace height={100} />
      <ImageViewer
        start={imageViewerProps.start}
        end={imageViewerProps.end}
        images={imageViewerProps.images}
        timeFrame={30}
        toggleTimeCarousel={toggleTimeCarousel}
      />
      {loadingMoreImages && <Loading notFullPage />}
    </>
  );
}
export default Home;
