import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import { API_ORIGIN } from '../../config/AppConfig';

const TimeCarouselLogic = () => {
  const { useLoadPage, pageStatus, setPageStatus, navigate, params } =
    PageLogicHelper();

  // Load images when load the page
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

      res.data.forEach((image, index) => {
        if (image.uuid === params.uuid) {
          setInitialSlide(index);
        }
      });
    } catch (err) {
      console.log(err);
    }

    setPageStatus('idle');
  });
  const [initialSlide, setInitialSlide] = useState(0);

  // Manage full screen
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

  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = useCallback(() => {
    if (fullScreen) {
      document.exitFullscreen();
      setFullScreen(false);
    } else {
      requestFullscreen(document.documentElement);
      setFullScreen(true);
    }
    setFullScreen(!fullScreen);
  }, [fullScreen]);

  useEffect(() => {
    function handleFullscreenChange() {
      setFullScreen(document.fullscreenElement);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      // Clean up the listener when the component unmounts
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Images
  const [images, setImages] = useState([]);

  // Go back function
  const quitPage = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/');
  };

  return {
    pageStatus,
    images,
    fullScreen,
    toggleFullScreen,
    quitPage,
    initialSlide,
  };
};

export default TimeCarouselLogic;
