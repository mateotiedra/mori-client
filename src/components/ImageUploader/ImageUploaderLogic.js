import { useState } from 'react';
const UploadFileHelper = require('../../helpers/UploadFileHelper');

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
