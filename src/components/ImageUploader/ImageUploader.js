import React from 'react';

import ImageUploaderLogic from './ImageUploaderLogic';
import MoriCam from '../MoriCam/MoriCam';

function ImageUploader({ onSaveImg }) {
  const {
    saveFiles,
    uploadFile,
    openCam,
    onCloseCam,
    camIsOpen,
    inputCamSupported,
  } = ImageUploaderLogic({ onSaveImg });

  return (
    <>
      <input
        type='file'
        onChange={saveFiles}
        multiple
        accept='image/jpg, image/jpeg, image/png'
        capture={false}
      />
      <button onClick={uploadFile}>Upload File</button>
      {!inputCamSupported && (
        <>
          <button onClick={openCam}>Open Camera</button>
          <MoriCam
            onCloseCam={onCloseCam}
            open={camIsOpen}
            onSaveImg={onSaveImg}
          />
        </>
      )}
    </>
  );
}

export default ImageUploader;
