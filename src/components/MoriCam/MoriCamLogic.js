import { useRef, useState, useCallback } from 'react';

const MoriCamLogic = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // Manage the capture
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const discard = useCallback(() => {
    setImgSrc(null);
  }, []);

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
  };

  return {
    capture,
    discard,
    webcamRef,
    webcamProps,
    imgSrc,
    switchCamera,
  };
};

export default MoriCamLogic;
