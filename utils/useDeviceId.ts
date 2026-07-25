import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Application from "expo-application";

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        if (Platform.OS === "android") {
          // getAndroidId is synchronous on Android.
          setDeviceId(Application.getAndroidId());
        } else if (Platform.OS === "ios") {
          // getIosIdForVendorAsync returns a promise.
          const id = await Application.getIosIdForVendorAsync();
          setDeviceId(id);
        } else {
          setDeviceId("unknown-device");
        }
      } catch (error) {
        console.error("Error fetching device ID:", error);
        setDeviceId("unknown-device");
      }
    };

    fetchDeviceId();
  }, []);

  return deviceId;
};
