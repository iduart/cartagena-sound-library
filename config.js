const ENV = __DEV__ ? 'development' : 'production';

let config = {
  API_URL: `http://192.168.1.55:8000/`,
};

if (ENV === 'production') {
  config.API_URL = ``;
}

export default config;



