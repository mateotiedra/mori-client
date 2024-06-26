import { useCallback, useEffect, useState } from 'react';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const TimeCarouselLogic = ({ toggleTimeCarousel, images, loadMoreImages }) => {
  const { useLoadPage, pageStatus, setPageStatus, navigate, params } =
    PageLogicHelper();

  // Load images when load the page
  useLoadPage(() => {
    images.forEach((image, index) => {
      if (image.uuid === params.uuid) {
        setSlideId(index);
      }
    });

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
  const quitPage = useCallback(() => {
    toggleTimeCarousel();
    navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleTimeCarousel]);

  // Quit page when user go back
  useEffect(() => {
    const handleBackButton = (event) => {
      console.log('Back button pressed');
      quitPage();
    };
    window.addEventListener('popstate', handleBackButton);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [quitPage]);

  // Swipe image
  const onSwipeImg = (newId) => {
    if (newId < 0 || newId >= images.length) return;
    setSlideId(newId);
    navigate(`/image/${images[newId].uuid}`, { replace: true });
    if (newId >= images.length - 3) {
      loadMoreImages();
    }
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

  // Secret phone number display
  const [secretCount, setSecretCount] = useState(0);
  const increaseSecret = useCallback(() => {
    setSecretCount((prev) => ++prev);
  }, []);
  const ownerPhone =
    (images && images[slidId]?.phoneuser?.phone) || 'Pas spécifié';

  // Manage zoom
  const [zoomMode, setZoomMode] = useState(false);

  useEffect(() => {
    const handleTouch = (event) => {
      if (event.touches.length === 2) {
        setZoomMode(true);
      }
    };

    document.addEventListener('touchstart', handleTouch);

    return () => {
      document.removeEventListener('touchstart', handleTouch);
    };
  }, [setZoomMode]);

  const handleZoomChange = useCallback((zoom) => {
    if (zoom?.state?.scale <= 1) {
      setZoomMode(false);
    }
  }, []);

  return {
    pageStatus,
    images,
    fullScreen,
    toggleFullScreen,
    quitPage,
    slidId,
    onSwipeImg,
    downloadImg,
    increaseSecret,
    displaySecret: secretCount >= 4,
    ownerPhone,
    zoomMode,
    handleZoomChange,
  };
};

export default TimeCarouselLogic;
