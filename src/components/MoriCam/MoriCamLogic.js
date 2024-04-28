import { useRef, useState, useCallback } from 'react';
const UploadFileHelper = require('../../helpers/UploadFileHelper');

const MoriCamLogic = ({ onSaveImg }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // Manage the capture
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const discard = useCallback(() => {
    setImgSrc(null);
  }, [setImgSrc]);

  // Manage camera switch
  const [facingUserMode, setFacingUserMode] = useState(false);
  const switchCamera = useCallback(() => {
    setFacingUserMode((prev) => !prev);
  }, []);

  // Cam settings
  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';
  const webcamProps = {
    videoConstraints: {
      facingMode: facingUserMode ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT,
    },
    ref: webcamRef,
    mirrored: facingUserMode,
    screenshotFormat: 'image/jpeg',
    screenshotQuality: 1,
  };

  // Save the file
  const [uploading, setUploading] = useState(false);

  const saveFile = useCallback(() => {
    if (uploading) return;
    setUploading(true);
    const file = UploadFileHelper.dataURLtoFile(imgSrc, 'image.jpg');
    UploadFileHelper.upload([file], () => {
      setUploading(false);
      discard();
      onSaveImg && onSaveImg();
    });
  }, [imgSrc, onSaveImg, uploading, setUploading, discard]);

  return {
    capture,
    discard,
    webcamRef,
    webcamProps,
    imgSrc,
    switchCamera,
    saveFile,
    uploading,
  };
};

export default MoriCamLogic;
