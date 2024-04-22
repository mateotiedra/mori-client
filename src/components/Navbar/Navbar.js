import React from 'react';

import NavbarLogic from './NavbarLogic';

//import Logo from '../../assets/rsvg/logo.js';
import { AppBar, Container, Link, Typography, Box } from '@mui/material';
import { HashLink as RouterLink } from 'react-router-hash-link';

function Navbar({ admin, coverPage, empty, goHomeAction }) {
  const { navLinksObj, onClickLink, keyboardVisibility } = NavbarLogic(admin);

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          display: {
            xs: empty ? 'flex' : keyboardVisibility,
            sm: empty ? 'flex' : keyboardVisibility,
            md: 'flex',
          },
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          position: 'fixed',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          top: 'auto',
          bottom: empty ? 'auto' : { xs: 0, sm: 0, md: 'auto' },
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* 
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'background.default',
              opacity: 0.8,
            }}
          /> */}

          <Link
            sx={{
              display: { xs: empty ? 'flex' : 'none', sm: 'flex' },
              flexDirection: 'row',
              alignItems: 'center',
              height: '70px',
              mr: !empty && 'auto',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            component={RouterLink}
            to='/'
            onClick={goHomeAction}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              Okalo
            </Typography>
            <Box sx={{ height: 40, width: 40, ml: 1 }}>{/* <Logo /> */}</Box>
          </Link>
          {!empty &&
            navLinksObj.map((linkObj) => {
              return (
                <Link
                  key={linkObj.text}
                  onClick={onClickLink(linkObj.to)}
                  sx={{
                    mx: 1,
                    px: 1,
                    py: { xs: 2, sm: 2, md: 2 },
                    color: 'text.primary',
                    transitionDuration: '500ms',
                    border: '2px solid transparent',
                    ':hover': {
                      textDecoration: 'none',
                    },
                    ':active': {
                      opacity: 0.5,
                    },
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  {React.cloneElement(linkObj.icon, {
                    size: linkObj.current ? 32 : 30,
                  })}
                  <Typography
                    variant='caption'
                    sx={{
                      fontSize: 12,
                      fontWeight: linkObj.current ? 'bold' : 'regular',
                    }}
                  >
                    {linkObj.text}
                  </Typography>
                </Link>
              );
            })}
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
