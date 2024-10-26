import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

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
  title: string; // Added title field
  message: string;
  timestamp: Date;
  type: "usage" | "warning";
  viewed: 0 | 1; // 0 for not viewed, 1 for viewed
};

export const notificationsData: Notification[] = [
  {
    id: 1,
    title: "Machine Available", // Added title field
    message: "Your laundry machine is now available for use.",
    timestamp: new Date(),
    type: "usage",
    viewed: 0,
  },
  {
    id: 2,
    title: "Pickup Reminder", // Added title field
    message:
      "Reminder: Please pick up your clothes within the next 30 minutes.",
    timestamp: new Date(),
    type: "warning",
    viewed: 0,
  },
  {
    id: 3,
    title: "Cycle Complete", // Added title field
    message: "Your laundry cycle is complete. Please collect your clothes.",
    timestamp: new Date(),
    type: "usage",
    viewed: 0,
  },
  {
    id: 4,
    title: "Clothes Left", // Added title field
    message: "Warning: Your clothes have been in the machine for over an hour.",
    timestamp: new Date(),
    type: "warning",
    viewed: 0,
  },
  {
    id: 5,
    title: "Maintenance Alert",
    message: "Scheduled maintenance will occur tomorrow from 2 AM to 4 AM.",
    timestamp: new Date(),
    type: "warning",
    viewed: 0,
  },
  {
    id: 6,
    title: "New Feature",
    message:
      "Check out the new feature in our app: Real-time machine availability.",
    timestamp: new Date(),
    type: "usage",
    viewed: 0,
  },
];

const getNotifications = async (): Promise<Notification[]> => {
  return notificationsData;
};

export default getNotifications;
