import axios from 'axios';
import { API_ORIGIN, EVENT_ID } from '../config/AppConfig';

import imageCompression from 'browser-image-compression';

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

export const upload = async (files, next) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    const originalFile = files[i];
    const renamedFile = new File(
      [originalFile],
      `${Date.now()}-${originalFile.name}`,
      { type: originalFile.type }
    );

    formData.append(
      'images',
      await getCompressedImage(renamedFile, false, 0.8)
    );
    formData.append('images', await getCompressedImage(renamedFile, true, 0.2));
  }
  formData.append('eventId', EVENT_ID);

  formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);

  axios
    .post(API_ORIGIN + '/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      next && next(res);
    })
    .catch((err) => console.log(err));
};

const getCompressedImage = async (imgFile, isTn) => {
  const options = {
    maxSizeMB: isTn ? 0.2 : 1,
    maxWidthOrHeight: isTn ? 500 : 2000,
    useWebWorker: true,
  };

  try {
    const imgBlob = await imageCompression(imgFile, options);
    return new File([imgBlob], `${isTn ? 'tn-' : ''}${imgFile.name}`, {
      type: imgFile.type,
    });
  } catch (error) {
    console.error('Error compressing file:', error);
  }
};
