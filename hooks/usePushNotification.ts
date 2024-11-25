// src/hooks/useNotifications.ts
import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import { useUserInfo } from "@/service/authService";

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

    registerWithServer();
    console.log("Device registered with server");
  }, [deviceInfo.token, userId, deviceInfo.deviceType]);

  return {
    deviceInfo,
    userId,
    isRegistered,
    error,
  };
};

// Helper function to send push notifications
interface PushNotificationContent {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export const sendPushNotification = async (
  content: PushNotificationContent
): Promise<void> => {
  try {
    const message = {
      to: content.to,
      sound: "default",
      title: content.title,
      body: content.body,
      data: content.data || {},
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    console.log("Push notification sent:", result);
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw error;
  }
};
