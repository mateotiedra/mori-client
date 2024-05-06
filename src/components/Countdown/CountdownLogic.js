import { useEffect, useState } from 'react';

function getTimeRemaining(date1, date2) {
  // Calculate the difference in milliseconds
  const difference = Math.abs(date2 - date1);

  // Convert the difference into various time components
  const seconds = Math.floor((difference / 1000) % 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((difference / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((difference / 1000 / 60 / 60) % 24)
    .toString()
    .padStart(2, '0');
  const days = Math.floor(difference / 1000 / 60 / 60 / 24);
  const formattedDays = days > 0 ? `${days.toString().padStart(2, '0')}J ` : '';

  // Construct a string that describes the difference
  return `${formattedDays}${hours}:${minutes}:${seconds}`;
}

const CountdownLogic = ({ end }) => {
  const [timeLeftFormatted, setTimeLeftFormatted] = useState();

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      setTimeLeftFormatted(getTimeRemaining(now, end));
    };
    const interval = setInterval(compute, 1000);
    compute();

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  if (!end || end < new Date()) {
    return { timeLeftFormatted: '' };
  }

  return { timeLeftFormatted };
};

export default CountdownLogic;
