import React from 'react';

import ImageViewerLogic from './ImageViewerLogic';
import ImageGroup from '../ImageGroup/ImageGroup';
//import { HashLink as RouterLink } from 'react-router-hash-link';

function ImageViewer({ images }) {
  const { imgGrps } = ImageViewerLogic({ images });
  return (
    <>
      {imgGrps && imgGrps[0] && (
        <ImageGroup images={imgGrps[0]} title='19h00' />
      )}
    </>
  );
}

export default ImageViewer;
