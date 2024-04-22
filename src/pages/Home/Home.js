import React from 'react';

import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import { Box, Typography } from '@mui/material';
import Loading from '../Loading/Loading';

import HomeLogic from './HomeLogic';

function Home() {
  const { saveFile, uploadFile, imgSrc } = HomeLogic();
  return (
    <>
      <Typography variant='h1' align='center'>
        Home
      </Typography>
      <input type='file' onChange={saveFile} />
      <button onClick={uploadFile}>Upload File</button>
      <Box width='100%' component='img' src={imgSrc} />
    </>
  );
}
export default Home;
