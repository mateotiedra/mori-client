import { useEffect, useState } from 'react';
import axios from 'axios';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { navigate, useLoadPage, API_ORIGIN, pageStatus, setPageStatus } =
    PageLogicHelper();

  useLoadPage(async () => {});

  const [file, setFile] = useState();
  const [imgSrc, setImgSrc] = useState(
    'https://storage.googleapis.com/bucket-quickstart-mori-lumm-421113/images%252F1713820714110'
  );

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post(API_ORIGIN + '/image', formData)
      .then((res) => {
        setImgSrc(res.data[0].linkUrl);
        console.log(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  return {
    saveFile,
    uploadFile,
    imgSrc,
  };
};

export default HomeLogic;
