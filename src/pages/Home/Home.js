import React from 'react';

//import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Typography } from '@mui/material';

import ImageUploader from '../../components/ImageUploader/ImageUploader';

function Home() {
  return (
    <>
      <Typography variant='h1' align='center'>
        Home
      </Typography>
      <ImageUploader />
    </>
  );
}
export default Home;
