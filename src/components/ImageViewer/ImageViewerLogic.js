import { useCallback, useEffect, useState } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const daysInFrench = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

const ImageViewerLogic = ({
  images,
  start,
  end,
  timeFrame,
  toggleTimeCarousel,
}) => {
  const { navigate } = PageLogicHelper();

  const [imgGrps, setImgGrps] = useState([]);
  useEffect(() => {
    const now = new Date();
    const from = new Date(start);
    const to = new Date(end);

    if (now < from) return;

    const chunks = [];
    for (
      let t = new Date(from);
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
      if (postedAt < from || postedAt > to) {
        if (chunks[0].title !== 'En vrac') {
          chunks.unshift({
            title: 'En vrac',
            timeStamp: to,
            images: [],
          });
        }
        chunks[0].images.push(image);
        return;
      }

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

  const clickImage = useCallback(
    (uuid) => () => {
      navigate(`/image/${uuid}`);
      toggleTimeCarousel();
    },
    [navigate, toggleTimeCarousel]
  );

  return {
    imgGrps,
    clickImage,
  };
};

export default ImageViewerLogic;
