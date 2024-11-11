import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import axios from "axios";
import { API_RegisDevice } from "@env";

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        sendTokenToServer(token);
        console.log(token);
      }
    });
  }, []);

  return expoPushToken;
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  console.log(token);

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Push Token:", token);
  return token;
}

export async function sendTokenToServer(expoPushToken: string) {
  try {
    await axios.post(API_RegisDevice, {
      userID: "4",
      pushToken: expoPushToken,
    });
    console.log("Push token sent successfully.");
  } catch (error) {
    console.error("Failed to send push token:", error);
  }
}
