import React from 'react';

import ImageViewerLogic from './ImageViewerLogic';
import ImageGroup from '../ImageGroup/ImageGroup';

function ImageViewer(props) {
  const { imgGrps, clickImage } = ImageViewerLogic(props);

  return (
    <>
      {imgGrps.map((imgGrp, i) => {
        if (imgGrp.images.length === 0) {
          return null;
        }
        return (
          <ImageGroup
            key={i}
            images={imgGrp.images}
            title={imgGrp.title}
            clickImage={clickImage}
          />
        );
      })}
    </>
  );
}

export default ImageViewer;
