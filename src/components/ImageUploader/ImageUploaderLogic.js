import { useState } from 'react';
const UploadFileHelper = require('../../helpers/UploadFileHelper');

const ImageUploaderLogic = ({ onSaveImg }) => {
  const [files, setFiles] = useState([]);
  const saveFiles = (e) => {
    setFiles(e.target.files);
  };

  const [loading, setLoading] = useState(false);
  const uploadFile = (e) => {
    setLoading(true);
    UploadFileHelper.upload(files, false, (res) => {
      setLoading(false);
      onSaveImg(res.data.imageUuid);
      //onSaveImg
    });
  };

  return {
    saveFiles,
    uploadFile,
    loading,
  };
};

export default ImageUploaderLogic;
