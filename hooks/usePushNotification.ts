// src/hooks/useNotifications.ts
import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import { useUserInfo } from "@/service/authService";
import messaging from "@react-native-firebase/messaging";

interface DeviceInfo {
  deviceType: Device.DeviceType | null;
  token: string | null;
}

interface UseNotificationReturn {
  deviceInfo: DeviceInfo;
  userId: number | null;
  isRegistered: boolean;
  error: string | null;
}

// Configure notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const useNotifications = (): UseNotificationReturn => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: null,
    token: null,
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userInfo = useUserInfo();
  const userId = userInfo?.id || null;

  // Fetch device type and request notification permissions
  useEffect(() => {
    const initializeDeviceAndToken = async () => {
      try {
        // Get device type
        const deviceType = Device.deviceType || null;
        setDeviceInfo((prev) => ({ ...prev, deviceType }));

        // Check if device is physical
        if (!Device.isDevice) {
          setError("Must use physical device for Push Notifications");
          return;
        }

        // Request permissions
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        console.log("Existing status:", existingStatus);

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          setError("Failed to get push token for push notification!");
          return;
        }

        // Get Expo push token
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;

        if (!projectId) {
          setError("Project ID not found in app configuration");
          return;
        }

        const pushToken = await Notifications.getDevicePushTokenAsync();

        setDeviceInfo((prev) => ({ ...prev, token: pushToken.data }));
        console.log("Push token:", pushToken.data);
      } catch (error) {
        setError(
          "Error initializing notifications: " + (error as Error).message
        );
        console.error("Error:", error);
      }
    };

    initializeDeviceAndToken();
    console.log("Device initialized");
  }, []);

  // Register device token with server
  useEffect(() => {
    const registerWithServer = async () => {
      if (!deviceInfo.token || !userId || !deviceInfo.deviceType) {
        return;
      }

      try {
        const response = await axios.post(
          process.env.EXPO_PUBLIC_API_RegisDevice as string,
          {
            userId,
            fcmToken: deviceInfo.token,
            deviceType: deviceInfo.deviceType.toString(),
          }
        );

        if (response.status === 200) {
          setIsRegistered(true);
          console.log("Device registered successfully with server");
        }
      } catch (error) {
        setError("Failed to register with server: " + (error as Error).message);
        console.error("Server registration error:", error);
      }
    };

    console.log("Device registered with server");

    registerWithServer();
    recieveNotification();
  }, [deviceInfo.token, userId, deviceInfo.deviceType]);

  return {
    deviceInfo,
    userId,
    isRegistered,
    error,
  };
};

const recieveNotification = async () => {
  messaging().onMessage(async (remoteMessage: any) => {
    console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    pushNotificationHandler(remoteMessage);
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    console.log("Message handled in the background!", remoteMessage);
    pushNotificationHandler(remoteMessage);
  });
  messaging().onNotificationOpenedApp((remoteMessage: any) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage
    );
    pushNotificationHandler(remoteMessage);
  });
};

const pushNotificationHandler = async (remoteMessage: any) => {
  const { notification, data } = remoteMessage || {};
  const title = notification?.title || "Default Title";
  const body = notification?.body || "Default Body";

  console.log("Handling notification:", { title, body, data });

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: null, // Hiển thị ngay lập tức
  });
};
