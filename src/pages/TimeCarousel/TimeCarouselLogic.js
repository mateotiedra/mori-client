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
          setSlideId(index);
        }
      });
    } catch (err) {
      console.log(err);
    }

    setPageStatus('idle');
  });
  const [slidId, setSlideId] = useState(0);

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

  // Go back function
  const quitPage = () => {
    navigate('/');
  };

  // Images
  const [images, setImages] = useState([]);

  // Swipe image
  const onSwipeImg = (newId) => {
    if (newId < 0 || newId >= images.length) return;
    setSlideId(newId);
    navigate(`/image/${images[newId].uuid}`, { replace: true });
  };

  // Download image
  const downloadImg = useCallback(
    (e) => {
      e.preventDefault();
      // Remote URL for the file to be downloaded
      const url = images[slidId].url;

      const formattedDate = images[slidId]?.postedAt
        .split('.')[0]
        .replace(/:/g, '-')
        .replace('T', '_');
      const filename = 'LUMMC_' + formattedDate + '.jpg';

      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const blobURL = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobURL;
          a.style.display = 'none';

          if (filename && filename.length) a.download = filename;
          document.body.appendChild(a);
          a.click();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [images, slidId]
  );

  return {
    pageStatus,
    images,
    fullScreen,
    toggleFullScreen,
    quitPage,
    slidId,
    onSwipeImg,
    downloadImg,
  };
};

export default TimeCarouselLogic;
