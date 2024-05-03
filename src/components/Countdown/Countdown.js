import Palette from '../../theme/palette.js';

import { Box, Typography } from '@mui/material';

import CountdownLogic from './CountdownLogic';

function Countdown(props) {
  const { timeLeftFormatted } = CountdownLogic(props);
  const { STATE_GREY } = Palette();

  const timerDescriptionProps = {
    variant: 'body2',
    color: STATE_GREY,
    fontSize: 'min(3vw, 20px)',
  };

  const logosStyle = { height: { xs: '16px', sm: '20px' } };

  return <Typography variant='h2'>{timeLeftFormatted}</Typography>;
}

export default Countdown;
