export const API_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? window.location.href.split(':3000')[0] +
      ':' +
      process.env.REACT_APP_API_PORT_DEVELOPMENT //http://localhost:8000
    : process.env.REACT_APP_API_URL_PRODUCTION; //https://garegabot-ce14aee9f894.herokuapp.com
