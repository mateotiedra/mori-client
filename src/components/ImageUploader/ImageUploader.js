import React from 'react';

import ImageUploaderLogic from './ImageUploaderLogic';

//import Logo from '../../assets/rsvg/logo.js';

function ImageUploader(props) {
  const { saveFiles, uploadFile } = ImageUploaderLogic(props);

  return (
    <>
      <input
        type='file'
        onChange={saveFiles}
        multiple
        accept='.jpg, .jpeg, .png'
      />
      <button onClick={uploadFile}>Upload File</button>
      {/* <Box width='100%' component='img' src={imgSrc} /> */}
    </>
  );
}

export default ImageUploader;
