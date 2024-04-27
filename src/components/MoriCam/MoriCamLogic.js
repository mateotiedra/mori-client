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

  return { capture, discard, webcamRef, imgSrc };
};

export default MoriCamLogic;
