import axios from 'axios';
import { API_ORIGIN } from '../config/AppConfig';

export const dataURLtoFile = (dataurl, filename) => {
  // Split the DataURL to get the base64 data and MIME type
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Create a Blob object from the Uint8Array
  const blob = new Blob([u8arr], { type: mime });

  // Return a new File object
  return new File([blob], filename, { type: mime });
};

export const upload = (files, next) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i]);
  }

  formData.append('eventId', 1);

  axios
    .post(API_ORIGIN + 'image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      next && next();
    })
    .catch((err) => console.log(err));
};
