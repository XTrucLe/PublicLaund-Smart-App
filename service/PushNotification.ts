import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { Timestamp } from "./machineService";
import callAPI from "@/hooks/useCallAPI";

// Thiết lập cách hiển thị thông báo (âm thanh, huy hiệu, popup,...)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

// Hàm đăng ký thông báo đẩy
export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.esa.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

// Hàm lập lịch thông báo cục bộ
export const schedulePushNotification = async (
  minutes: number,
  endTimeStamp: number,
  p0: number,
  message: string
) => {
  let seconds = minutes * 60;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Thông báo từ ứng dụng giặt!",
      body: message,
      data: { data: "data goes here" },
    },
    trigger: { seconds }, // Thời gian (s) để gửi thông báo
  });
};

// Hàm lắng nghe thông báo
export const notificationListeners = (setNotification: any) => {
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      setNotification(notification);
    }
  );

  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

  return {
    notificationListener,
    responseListener,
  };
};

// Hàm hủy đăng ký lắng nghe thông báo
export const removeNotificationListeners = (
  notificationListener: any,
  responseListener: any
) => {
  Notifications.removeNotificationSubscription(notificationListener);
  Notifications.removeNotificationSubscription(responseListener);
};

export type Notification = {
  id: number;
  message: string;
  userId: number;
  createdAt: Timestamp; // Thời gian dạng chuỗi ISO (e.g., "2024-11-24T10:30:00")
  isRead: boolean;
};

export const notificationsData: Notification[] = [];

const getNotificationsFB = () => {};

const getNotifications = async (): Promise<Notification[]> => {
  const getAPI = process.env.EXPO_PUBLIC_API_GetNotifications as string;
  try {
    return callAPI(getAPI, {}, "GET");
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
};

export default getNotifications;
