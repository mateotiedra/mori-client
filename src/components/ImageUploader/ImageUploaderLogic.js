import axios from 'axios';
import { useState } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const ImageUploaderLogic = () => {
  const { API_ORIGIN } = PageLogicHelper();

  const [files, setFiles] = useState();

  const saveFiles = (e) => {
    setFiles(e.target.files);
  };

  const uploadFile = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    axios
      .post(API_ORIGIN + '/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  return {
    saveFiles,
    uploadFile,
  };
};

export default ImageUploaderLogic;
