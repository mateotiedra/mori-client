import { useCallback, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import { API_ORIGIN } from '../../config/AppConfig';

const HomeLogic = () => {
  const { useLoadPage, pageStatus, setPageStatus } = PageLogicHelper();

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

    try {
      const res = await axios.get(API_ORIGIN + '/image/latest', {
        params: { eventId: event.id },
      });
      setLatestImages(res.data);
    } catch (err) {
      console.log(err);
    }
    setPageStatus('idle');
  });

  // Latest images
  const [latestImages, setLatestImages] = useState([]);

  // Event
  const [event, setEvent] = useState();
  const uploadMode = event?.endAt < new Date() ? 'gallery' : 'cam';
  const eventName = event?.name;
  const eventEnd = new Date(event?.endAt);

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
    setPageStatus('loading');
  }, [setPageStatus]);

  const [imagesUuid, setImageUuids] = useState(null);
  const onSaveImg = useCallback(
    (images) => {
      // Add image to latest images
      setLatestImages((prev) => [...images, ...prev]);

      // Check if user is already registered
      const xAccessToken = localStorage.getItem('x-access-token');
      if (xAccessToken) {
        addOwner(
          xAccessToken,
          images.map((img) => img.uuid)
        );
      } else if (localStorage.getItem('cntr')) {
        // chose not to register
        setPageStatus('idle');
      } else {
        setImageUuids(images.map((img) => img.uuid));
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
  };
};

export default HomeLogic;
