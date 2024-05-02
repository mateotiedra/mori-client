import { useEffect, useState } from 'react';
import {} from 'react-router-dom';

const ImageViewerLogic = ({ images, start, end, timeFrame }) => {
  const [imgGrps, setImgGrps] = useState([]);
  useEffect(() => {
    const now = new Date(/* '2024-05-03 02:30:44' */);
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

      chunks.push({
        title: `${roundedTime
          .getHours()
          .toString()
          .padStart(2, '0')}h${roundedTime
          .getMinutes()
          .toString()
          .padStart(2, '0')}`,
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
