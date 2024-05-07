import { useEffect, useState } from 'react';
import {} from 'react-router-dom';

const daysInFrench = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
];

const ImageViewerLogic = ({ images, start, end, timeFrame }) => {
  const [imgGrps, setImgGrps] = useState([]);
  useEffect(() => {
    const now = new Date();
    const from = new Date(start);
    const to = new Date(end);

    if (now < from) return;

    const chunks = [];
    for (
      let t = from;
      t < Math.min(now, to);
      t.setMinutes(t.getMinutes() + timeFrame)
    ) {
      const roundedTime = new Date(t);
      roundedTime.setMinutes(
        Math.floor(t.getMinutes() / timeFrame) * timeFrame
      );
      roundedTime.setSeconds(0);
      roundedTime.setMilliseconds(0);

      // specify the day if there is more than 24 hours between now and the roundedTime
      const specifyDay =
        roundedTime.getDay() !== now.getDay() &&
        now - roundedTime > 9 * 60 * 60 * 1000
          ? daysInFrench[roundedTime.getDay()]
          : '';

      const formattedTitle = `${specifyDay} ${roundedTime
        .getHours()
        .toString()
        .padStart(2, '0')}h${roundedTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      chunks.push({
        title: formattedTitle,
        timeStamp: roundedTime,
        images: [],
      });
    }

    if (now < to) {
      chunks[chunks.length - 1].title = "À l'instant";
    } else if (now > to) {
      chunks.push({
        title: 'En vrac',
        timeStamp: to,
        images: [],
      });
    }

    chunks.reverse();

    images.forEach((image) => {
      const postedAt = new Date(image.postedAt);
      for (let chunk_i = 0; chunk_i < chunks.length; ++chunk_i) {
        const chunk = chunks[chunk_i];
        if (postedAt >= chunk.timeStamp) {
          //console.log('pushing', chunk.timeStamp, postedAt);
          chunk.images.push(image);
          break;
        }
      }
    });

    setImgGrps(chunks);
  }, [images, start, end, timeFrame]);

  return {
    imgGrps,
  };
};

export default ImageViewerLogic;
