import { useCallback, useState } from 'react';
import axios from 'axios';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import { API_ORIGIN } from '../../config/AppConfig';

const TimeCarouselLogic = () => {
  const { useLoadPage, pageStatus, setPageStatus } = PageLogicHelper();
  function requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  }

  useLoadPage(async () => {
    let event;
    try {
      const res = await axios.get(API_ORIGIN + '/event', {
        params: { eventId: 1 },
      });
      event = res.data;
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await axios.get(API_ORIGIN + '/image/latest', {
        params: { eventId: event.id },
      });
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
    requestFullscreen(document.documentElement);
    setPageStatus('idle');
  });

  // Images
  const [images, setImages] = useState([]);

  return {
    pageStatus,
    images,
  };
};

export default TimeCarouselLogic;
