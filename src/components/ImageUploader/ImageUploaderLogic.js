import { useState } from 'react';
import axios from 'axios';
import * as piexif from 'piexifjs';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const getExifFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns a zero-based month, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
};

const dataURLtoFile = (dataurl, filename) => {
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

const ImageUploaderLogic = () => {
  const { API_ORIGIN } = PageLogicHelper();

  const [files, setFiles] = useState([]);

  const saveFiles = (e) => {
    const newFiles = [];
    const addNewFile = (newFile) => {
      newFiles.push(newFile);
    };

    // Loop through input files and add save them in newFiles
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let readFile = e.target.result;

        const exifObj = piexif.load(e.target.result);

        // If the image does not have the DateTimeOriginal tag, add it
        if (!exifObj.Exif[piexif.ExifIFD.DateTimeOriginal]) {
          var exif = {};
          exif[piexif.ExifIFD.DateTimeOriginal] = getExifFormattedDate(
            new Date(Date.now())
          );

          const exifStr = piexif.dump({ '0th': {}, Exif: exif, GPS: {} });

          readFile = dataURLtoFile(piexif.insert(exifStr, e.target.result));
        }

        addNewFile(readFile);
      };

      reader.readAsDataURL(e.target.files[i]);
    }

    setFiles(newFiles);
  };

  const uploadFile = () => {
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
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return {
    saveFiles,
    uploadFile,
  };
};

export default ImageUploaderLogic;
