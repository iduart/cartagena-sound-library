import { Platform } from 'react-native';

const ENV = __DEV__ ? 'development' : 'production';
let adUnitId = '';

if (Platform.OS === 'android') {
  adUnitId = 'ca-app-pub-1100445203218854/6687263551';
} else if (Platform.OS === 'ios') {
  adUnitId = 'ca-app-pub-1100445203218854/7631296672';
}

// Config
let config = {
  API_URL: 'http://192.168.1.52:8000/',
  ADD_UNIT_ID: 'ca-app-pub-3940256099942544/6300978111', // Test ID 
};

if (ENV === 'production') {
  config.API_URL = '';
  config.ADD_UNIT_ID = adUnitId;
}

export default config;



