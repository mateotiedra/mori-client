import PageLogicHelper from '../../helpers/PageLogicHelper';

const AlertPageLogic = (props) => {
  const { setErrorCode } = PageLogicHelper();

  const goHomeAction = () => {
    setErrorCode(200);
  };
  return { goHomeAction };
};

export default AlertPageLogic;
