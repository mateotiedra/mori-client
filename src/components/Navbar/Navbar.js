import React from 'react';

//import NavbarLogic from './NavbarLogic';

import { AppBar, Container, Box } from '@mui/material';
//import { HashLink as RouterLink } from 'react-router-hash-link';

import LummLogo from '../../assets/images/lumm-c-jersey-design-white-empty-bkg.png';

function Navbar({ coverPage, empty, children, height, hideLogo }) {
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
          backgroundColor: 'rgba(18, 18, 18, 0.8)',
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
          {!hideLogo && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: height || 90,
                position: 'relative',
                top: -5,
              }}
              component='a'
              href='https://www.lumm.love'
            >
              <Box sx={{ height: 50 }} component='img' src={LummLogo} />
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: height || 90,
            }}
          >
            {children}
          </Box>
        </Container>
      </AppBar>
      {!coverPage && (
        <Box
          sx={{
            height: height || 90,
            width: '100%',
          }}
        />
      )}
    </>
  );
}

export default Navbar;
