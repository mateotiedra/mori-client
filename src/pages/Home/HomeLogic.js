import { useCallback, useState } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { useLoadPage } = PageLogicHelper();

  useLoadPage(async () => {});

  const [camOpen, setCamOpen] = useState(false);
  const openCam = useCallback(() => {
    setCamOpen(true);
  }, []);
  const onCloseCam = useCallback(() => {
    setCamOpen(false);
  }, []);

  return { camOpen, onCloseCam, openCam };
};

export default HomeLogic;
