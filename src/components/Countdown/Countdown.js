import { Typography } from '@mui/material';

import CountdownLogic from './CountdownLogic';

function Countdown({ sx, ...props }) {
  const { timeLeftFormatted } = CountdownLogic(props);

  return (
    <Typography variant='h2' sx={sx}>
      {timeLeftFormatted}
    </Typography>
  );
}

export default Countdown;
