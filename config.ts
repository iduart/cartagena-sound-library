import { Platform } from "react-native";
import Constants from "expo-constants";

const ENV = __DEV__ ? "development" : "production";
let adUnitId = "";

if (Platform.OS === "android") {
  // adUnitId = "ca-app-pub-1100445203218854/6687263551";
} else if (Platform.OS === "ios") {
  // adUnitId = "ca-app-pub-1100445203218854/7631296672";
}

const API_PORT = 8000;

// In dev the API runs on this machine's LAN IP, which changes with the DHCP
// lease. Reuse the host Expo already connected to instead of hardcoding it.
function devApiUrl() {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    (Constants.expoGoConfig as { debuggerHost?: string } | undefined)
      ?.debuggerHost;

  const host = hostUri?.split(":")[0];

  return host ? `http://${host}:${API_PORT}/` : `http://localhost:${API_PORT}/`;
}

// Explicit override, for pointing a dev build at the deployed API:
//
//   EXPO_PUBLIC_API_URL=https://api.cartagenasoundlibrary.com/ npx expo start -c
//
// EXPO_PUBLIC_* values are inlined at bundle time, so Metro needs restarting
// (with -c) for a change to take effect. HTTPS URLs work everywhere; a cleartext
// http:// URL to a public address is refused by iOS App Transport Security.
const apiUrlOverride = process.env.EXPO_PUBLIC_API_URL;

// Config
let config = {
  API_URL: devApiUrl(),
  // ADD_UNIT_ID: "ca-app-pub-3940256099942544/6300978111", // Test ID
};

if (ENV === "production") {
  config.API_URL = "https://api.cartagenasoundlibrary.com/";
  // config.ADD_UNIT_ID = adUnitId;
}

if (apiUrlOverride) {
  config.API_URL = apiUrlOverride.endsWith("/")
    ? apiUrlOverride
    : `${apiUrlOverride}/`;
}

export default config;
