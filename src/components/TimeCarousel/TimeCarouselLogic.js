import { useCallback, useEffect, useState } from 'react';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const TimeCarouselLogic = ({ toggleTimeCarousel, images }) => {
  const { useLoadPage, pageStatus, setPageStatus, navigate, params } =
    PageLogicHelper();

  // Load images when load the page
  useLoadPage(async () => {
    console.log(params.uuid);
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
    toggleTimeCarousel();
  };

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

  // Secret phone number display
  const [secretCount, setSecretCount] = useState(0);
  const increaseSecret = useCallback(() => {
    setSecretCount((prev) => ++prev);
  }, []);
  const ownerPhone =
    (images && images[slidId]?.phoneuser?.phone) || 'Pas spécifié';

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
  };
};

export default TimeCarouselLogic;
