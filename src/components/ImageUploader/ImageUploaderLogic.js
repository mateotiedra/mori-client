import { useState } from 'react';
import * as piexif from 'piexifjs';
const UploadFileHelper = require('../../helpers/UploadFileHelper');

const getExifFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns a zero-based month, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
};

const ImageUploaderLogic = () => {
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

          readFile = UploadFileHelper.dataURLtoFile(
            piexif.insert(exifStr, e.target.result)
          );
        }

        addNewFile(readFile);
      };

      reader.readAsDataURL(e.target.files[i]);
    }

    setFiles(newFiles);
  };

  const uploadFile = () => {
    UploadFileHelper.upload(files);
  };

  return {
    saveFiles,
    uploadFile,
  };
};

export default ImageUploaderLogic;
