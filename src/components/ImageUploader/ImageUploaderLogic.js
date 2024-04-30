import { useState, useCallback } from 'react';
const UploadFileHelper = require('../../helpers/UploadFileHelper');

const ImageUploaderLogic = ({ onSaveImg }) => {
  const [files, setFiles] = useState([]);
  const saveFiles = (e) => {
    setFiles(e.target.files);
  };

  // Upload of files
  const [loading, setLoading] = useState(false);
  const uploadFile = (e) => {
    setLoading(true);
    UploadFileHelper.upload(files, false, (res) => {
      setLoading(false);
      onSaveImg(res.data.imageUuid);
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

  // Check if input camera is supported
  const supportedPattern = /iPhone|iPad|iPod/i;
  const inputCamSupported = supportedPattern.test(navigator.userAgent) || true;

  return {
    saveFiles,
    uploadFile,
    loading,
    openCam,
    onCloseCam,
    camIsOpen,
    inputCamSupported,
  };
};

export default ImageUploaderLogic;
