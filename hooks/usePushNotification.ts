import axios from "axios";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import { useUserInfo } from "@/service/authService";
import messaging from "@react-native-firebase/messaging";

const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<{ deviceType: Device.DeviceType | null; token: string | null }>({
    deviceType: null,
    token: null,
  });
  const userId = useUserInfo()?.id;

  useEffect(() => {
    // Lấy loại thiết bị
    const fetchDeviceType = () => {
      const deviceType = Device.deviceType || null;

      setDeviceInfo((prev) => ({ ...prev, deviceType }));
    };

    // Lấy mã thông báo
    const requestNotificationToken = async () => {
      try {
        // Kiểm tra trạng thái quyền hiện tại
        const { status: currentStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = currentStatus;

        // Yêu cầu quyền nếu chưa được cấp
        if (currentStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        // Xử lý nếu quyền được cấp
        if (finalStatus === "granted") {
          const token = (await Notifications.getDevicePushTokenAsync()).data;
          const fcmToken = await messaging().getToken();
          console.error("Push token:", token);
          console.error("FCM token:", fcmToken);

          // Lưu token vào state hoặc gửi đến server
          setDeviceInfo((prev) => ({ ...prev, token }));
        } else {
          console.warn("Notification permission not granted");
        }
      } catch (error) {
        console.error("Error requesting notification permissions or getting token:", error);
      }
    };

    fetchDeviceType();
    requestNotificationToken();
  }, []);

  return { deviceInfo, userId };
};

const usePushNotification = () => {
  const { deviceInfo, userId } = useDeviceInfo();

  const sendTokenToServer = async () => {
    try {
      const { deviceType } = deviceInfo;
      const token = await messaging().getToken();
      console.error(token);
      const data = {
        userId: userId,
        fcmToken: token,
        deviceType: deviceType?.toString(),
      };
      let response = await axios.post(process.env.EXPO_PUBLIC_API_RegisDevice as string, data);
      console.log(response.data);

      if (response.status === 200) {
        console.log("Token sent to server successfully");
      } else {
        console.error(data);
        console.error("Failed to send token to server:", response.data || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending token to server:", (error as any).response?.data);
    }
  };

  useEffect(() => {
    sendTokenToServer();
    if (deviceInfo.token && userId) {
      sendTokenToServer();
    }
  }, [deviceInfo, userId]);

  return null; // Hoặc trả về UI khác nếu cần
};

export { useDeviceInfo, usePushNotification };
