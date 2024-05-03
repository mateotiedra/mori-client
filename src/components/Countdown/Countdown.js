import { Typography } from '@mui/material';

import CountdownLogic from './CountdownLogic';

function Countdown(props) {
  const { timeLeftFormatted } = CountdownLogic(props);

  return <Typography variant='h2'>{timeLeftFormatted}</Typography>;
}

export default Countdown;
