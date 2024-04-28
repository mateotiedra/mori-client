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
    setFiles(e.target.files);
  };

  const [loading, setLoading] = useState(false);
  const uploadFile = (e) => {
    setLoading(true);
    UploadFileHelper.upload(files, () => {
      setLoading(false);
    });
  };

  return {
    saveFiles,
    uploadFile,
    loading,
  };
};

export default ImageUploaderLogic;
