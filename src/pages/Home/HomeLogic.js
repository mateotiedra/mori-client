import { useCallback } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { useLoadPage, pageStatus, setPageStatus } = PageLogicHelper();

  useLoadPage(async () => {});

  // Manage cam opening
  const openCam = useCallback(() => {
    setPageStatus('cam');
  }, [setPageStatus]);
  const onCloseCam = useCallback(() => {
    setPageStatus('idle');
  }, [setPageStatus]);

  // After uploading the image
  const onSaveImg = useCallback(() => {
    setPageStatus('uploaded');
  }, [setPageStatus]);

  return { openCam, onCloseCam, pageStatus, onSaveImg };
};

export default HomeLogic;
