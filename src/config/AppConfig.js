const AppConfig = () => {
  const API_ORIGIN =
    process.env.NODE_ENV === 'development'
      ? window.location.href.replace(
          '3000',
          process.env.REACT_APP_API_PORT_DEVELOPMENT
        ) //http://localhost:8000
      : process.env.REACT_APP_API_URL_PRODUCTION; //https://garegabot-ce14aee9f894.herokuapp.com

  return { API_ORIGIN };
};

export default AppConfig;
