import React from 'react';
import { Box, Typography } from '@mui/material';

import { HashLink } from 'react-router-hash-link';

import AlertPageLogic from './AlertPageLogic';
import Navbar from '../Navbar/Navbar';
import UnderlinedTitle from '../UnderlinedTitle/UnderlinedTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SectionContainer from '../SectionContainer/SectionContainer';

function AlertPage({ title, body, ctaButtons, error, ...props }) {
  const { goHomeAction } = AlertPageLogic();

  return (
    <>
      <Navbar coverPage empty goHomeAction={goHomeAction} />
      <SectionContainer fullPage centered>
        <UnderlinedTitle color={error ? 'error.main' : 'primary.main'}>
          {title}
        </UnderlinedTitle>
        {typeof body === 'string' ? (
          <Typography variant='body1'>{body}</Typography>
        ) : (
          body
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 3,
            width: '100%',
          }}
        >
          {ctaButtons &&
            ctaButtons.map(({ sx, onClick, text, to, ...button }) => {
              return (
                <LoadingButton
                  sx={{ width: '100%', ...sx }}
                  variant='contained'
                  onClick={onClick}
                  key={text}
                  component={Boolean(to) ? HashLink : undefined}
                  to={to}
                  {...button}
                >
                  <Typography variant='body1'>{text}</Typography>
                </LoadingButton>
              );
            })}
        </Box>
      </SectionContainer>
    </>
  );
}

export default AlertPage;
