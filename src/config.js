const ENV = __DEV__ ? 'development' : 'production';

let config = {
  API_URL: `http://0.0.0.0:8000/`,
};

if (ENV === 'production') {
  config.API_URL = ``;
}

export default config;



