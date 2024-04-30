import React from 'react';

//import NavbarLogic from './NavbarLogic';

import { AppBar, Container, Box } from '@mui/material';
//import { HashLink as RouterLink } from 'react-router-hash-link';

import LummLogo from '../../assets/images/lumm-c-jersey-design-red-empty-bkg.png';

function Navbar({ coverPage, empty }) {
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          display: {
            xs: 'flex',
            sm: 'flex',
            md: 'flex',
          },
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          position: 'fixed',
          //backgroundColor: 'rgba(255, 255, 255, 0.7)',
          bottom: empty ? 'auto' : { xs: 0, sm: 0, md: 'auto' },
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 90,
            }}
            component='a'
            href='https://www.lumm.love'
          >
            <Box sx={{ height: 50 }} component='img' src={LummLogo} />
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 90,
            }}
            component='a'
            href='www.lumm.love'
          >
            <Typography
              variant='h1'
              sx={{
                textDecoration: 'none',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: 44,
              }}
            >
              Morii
            </Typography>
          </Box> */}
        </Container>
      </AppBar>
      {!coverPage && (
        <Box
          sx={{
            height: 90,
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}
        />
      )}
    </>
  );
}

export default Navbar;
