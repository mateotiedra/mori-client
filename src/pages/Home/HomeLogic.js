import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { useLoadPage } = PageLogicHelper();

  useLoadPage(async () => {});

  return {};
};

export default HomeLogic;
