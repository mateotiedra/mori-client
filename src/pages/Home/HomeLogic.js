import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import { API_ORIGIN } from '../../config/AppConfig';

const HomeLogic = () => {
  const { useLoadPage, pageStatus, setPageStatus /* params */ } =
    PageLogicHelper();

  // Page load
  const nbrImgReq = 6;
  useLoadPage(async () => {
    let event;
    try {
      const res = await axios.get(API_ORIGIN + '/event', {
        params: { eventId: 1 },
      });
      event = res.data;
      setEvent(event);
    } catch (err) {
      console.log(err);
    }

    document.title = event?.name || 'Morii';

    try {
      const res = await axios.get(API_ORIGIN + '/image/latest', {
        params: { eventId: event.id, limit: nbrImgReq },
      });
      allImageLoaded.current = res.data.length < nbrImgReq;
      setLatestImages(res.data);
    } catch (err) {
      console.log(err);
    }
    setPageStatus('idle');
  });

  // Event
  const [event, setEvent] = useState();
  const uploadMode = event?.endAt < new Date() ? 'gallery' : 'cam';
  const eventName = event?.name;
  const eventEnd = new Date(event?.endAt);

  // Latest images
  const [latestImages, setLatestImages] = useState([]);

  // Load more images
  const allImageLoaded = useRef(false);
  const [loadingMoreImages, setLoadingMoreImages] = useState(false);

  const loadMoreImages = useCallback(async () => {
    setLoadingMoreImages(true);

    try {
      const res = await axios.get(API_ORIGIN + '/image/latest', {
        params: {
          eventId: event.id,
          lastImageUuid: latestImages[latestImages.length - 1].uuid,
          limit: nbrImgReq,
        },
      });

      allImageLoaded.current = res.data.length < nbrImgReq;
      setLatestImages((prev) => [...prev, ...res.data]);

      setLoadingMoreImages(false);
    } catch (err) {
      console.log(err);
    }
  }, [
    setLoadingMoreImages,
    allImageLoaded,
    event,
    latestImages,
    setLatestImages,
  ]);

  useEffect(() => {
    window.onscroll = async () => {
      if (
        window.innerHeight + window.scrollY + 100 <=
          document.body.offsetHeight ||
        pageStatus !== 'idle' ||
        !event ||
        !latestImages ||
        !latestImages.length ||
        allImageLoaded.current
      )
        return;

      loadMoreImages();

      return () => {
        window.onscroll = null;
      };
    };
    // eslint-disable-next-line
  }, [pageStatus, event, latestImages, allImageLoaded]);

  // Add owner to image
  const addOwner = useCallback(
    async (xAccessToken, givenImagesUuid) => {
      try {
        for (let i = 0; i < givenImagesUuid.length; i++) {
          await axios.put(
            API_ORIGIN + '/image/addowner',
            { imageUuid: givenImagesUuid[i] },
            {
              headers: {
                'x-access-token':
                  xAccessToken || localStorage.getItem('x-access-token'),
              },
            }
          );
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          localStorage.removeItem('x-access-token');
          setPageStatus('register');
        }
      }
      setPageStatus('idle');
    },
    [setPageStatus]
  );

  // Uploading the image
  const onStartImgUpload = useCallback(() => {
    setPageStatus('loading-img');
  }, [setPageStatus]);

  const [imagesUuid, setImageUuids] = useState(null);
  const onSaveImg = useCallback(
    (latestImages) => {
      // Add image to latest latestImages
      setLatestImages((prev) => {
        const newImages = [...latestImages, ...prev];
        newImages.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        return newImages;
      });

      // Check if user is already registered
      const xAccessToken = localStorage.getItem('x-access-token');
      if (xAccessToken) {
        addOwner(
          xAccessToken,
          latestImages.map((img) => img.uuid)
        );
      } else if (localStorage.getItem('cntr')) {
        // chose not to register
        setPageStatus('idle');
      } else {
        setImageUuids(latestImages.map((img) => img.uuid));
        setPageStatus('register');
      }
    },
    [setPageStatus, addOwner, setLatestImages, setImageUuids]
  );

  // Register phone number
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ phone }) => {
    axios
      .post(API_ORIGIN + '/phoneuser/register', { phone })
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.accessToken);
        addOwner(res.data.accessToken, imagesUuid);
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          setPhoneErrorMessage('Numéro de téléphone déjà utilisé');
        } else {
          console.log(err);
        }
      });
  };
  const phoneRegistration = register('phone', {
    pattern: {
      value: /^(?:\+\d{1,3}\s?)?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/gm,
      message: 'Numéro de téléphone invalide',
    },
  });
  const [phoneErrorMessage, setPhoneErrorMessage] = useState();

  // Don't participate
  const dontParticipate = useCallback(() => {
    localStorage.setItem('cntr', 'true');
    setPageStatus('idle');
  }, [setPageStatus]);

  // Image viewer
  const imageViewerProps = {
    images: latestImages,
    start: new Date(event?.startAt),
    end: new Date(event?.endAt),
  };

  const toggleTimeCarousel = useCallback(() => {
    if (pageStatus === 'idle') {
      setPageStatus('time-carousel');
      document.body.style.overflow = 'hidden';
    } else if (pageStatus === 'time-carousel') {
      setPageStatus('idle');
      document.body.style.overflow = 'auto';
    }
  }, [pageStatus, setPageStatus]);

  return {
    pageStatus,
    onSaveImg,
    phoneRegistration,
    onSubmit: handleSubmit(onSubmit),
    phoneErrorMessage: errors.phone?.message || phoneErrorMessage,
    latestImages,
    event,
    imageViewerProps,
    onStartImgUpload,
    dontParticipate,
    uploadMode,
    eventName,
    eventEnd,
    toggleTimeCarousel,
    loadMoreImages,
    loadingMoreImages,
  };
};

export default HomeLogic;
