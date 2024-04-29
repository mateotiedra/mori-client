import { useCallback, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import { API_ORIGIN } from '../../config/AppConfig';

const HomeLogic = () => {
  const { useLoadPage, pageStatus, setPageStatus } = PageLogicHelper();

  useLoadPage(async () => {
    setPageStatus('idle');
  });

  // Add owner to image
  const addOwner = useCallback(
    (xAccessToken, givenImageUuid) => {
      axios
        .put(
          API_ORIGIN + 'image/addowner',
          { imageUuid: givenImageUuid },
          {
            headers: {
              'x-access-token':
                xAccessToken || localStorage.getItem('x-access-token'),
            },
          }
        )
        .then(() => {
          setPageStatus('idle');
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            localStorage.removeItem('x-access-token');
            setPageStatus('register');
          }
        });
    },
    [setPageStatus]
  );

  // After uploading the image
  const [imageUuid, setImageUuid] = useState(null);
  const onSaveImg = useCallback(
    (imageUuid) => {
      const xAccessToken = localStorage.getItem('x-access-token');
      if (xAccessToken) {
        addOwner(xAccessToken, imageUuid);
      } else if (localStorage.getItem('cntr')) {
        // chose not to register
        setPageStatus('idle');
      } else {
        setImageUuid(imageUuid);
        setPageStatus('register');
      }
    },
    [setPageStatus, addOwner, setImageUuid]
  );

  // Register phone number
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ phone }) => {
    axios
      .post(API_ORIGIN + 'phoneuser/register', { phone })
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.accessToken);
        addOwner(res.data.accessToken, imageUuid);
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

  return {
    pageStatus,
    onSaveImg,
    phoneRegistration,
    onSubmit: handleSubmit(onSubmit),
    phoneErrorMessage: errors.phone?.message || phoneErrorMessage,
  };
};

export default HomeLogic;
