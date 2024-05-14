import React /* useContext */ from 'react';
//import ErrorHandlerContext from '../../ErrorHandlerContext';

import { Box, Typography } from '@mui/material';

function Page500() {
  //const { setErrorCode } = useContext(ErrorHandlerContext);
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>Oops une erreur est survenue. Réessaie plus tard.</Typography>
    </Box>
  );
}

export default Page500;
