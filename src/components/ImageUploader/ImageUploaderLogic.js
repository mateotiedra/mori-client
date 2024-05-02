import { useState, useCallback } from 'react';
const UploadFileHelper = require('../../helpers/UploadFileHelper');

const ImageUploaderLogic = ({ onStartUpload, onFinishUpload }) => {
  // Upload of files
  const uploadFile = (e) => {
    onStartUpload && onStartUpload();
    UploadFileHelper.upload(e.target.files, false, (res) => {
      onStartUpload && onStartUpload();
      onFinishUpload && onFinishUpload(res?.data);
    });
  };

  // Manage MoriiCam opening
  const [camIsOpen, setCamIsOpen] = useState(false);
  const openCam = useCallback(() => {
    setCamIsOpen(true);
  }, [setCamIsOpen]);
  const onCloseCam = useCallback(() => {
    setCamIsOpen(false);
  }, [setCamIsOpen]);

  return {
    uploadFile,
    openCam,
    onCloseCam,
    camIsOpen,
  };
};

export default ImageUploaderLogic;
