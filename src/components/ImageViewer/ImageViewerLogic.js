import {} from 'react-router-dom';

const ImageViewerLogic = ({ images, from, to }) => {
  const imgGrps = images ? [images] : [];
  return {
    imgGrps,
  };
};

export default ImageViewerLogic;
