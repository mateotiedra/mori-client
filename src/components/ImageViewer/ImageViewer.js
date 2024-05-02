import React from 'react';

import ImageViewerLogic from './ImageViewerLogic';
import ImageGroup from '../ImageGroup/ImageGroup';
//import { HashLink as RouterLink } from 'react-router-hash-link';

function ImageViewer(props) {
  const { imgGrps } = ImageViewerLogic(props);

  return (
    <>
      {imgGrps.map((imgGrp, i) => {
        if (imgGrp.images.length === 0) {
          return null;
        }
        return (
          <ImageGroup key={i} images={imgGrp.images} title={imgGrp.title} />
        );
      })}
    </>
  );
}

export default ImageViewer;
