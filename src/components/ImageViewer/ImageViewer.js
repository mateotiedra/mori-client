import React from 'react';

//import ImageViewerLogic from './ImageViewerLogic';

import ImageViewerLogic from './ImageViewerLogic';
//import { HashLink as RouterLink } from 'react-router-hash-link';

function ImageViewer(props) {
  const { imagesGrp } = ImageViewerLogic(props);
  return <></>;
}

export default ImageViewer;
