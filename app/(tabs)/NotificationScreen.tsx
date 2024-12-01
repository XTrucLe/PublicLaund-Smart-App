import NotificationItem from "@/components/items/notificationItem";
import getNotifications, { Notification } from "@/service/PushNotification";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <ScrollView style={styles.notificationContainer}>
      {notifications.map((notification) => (
        <NotificationItem {...notification} key={notification.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 0,
  },
  notificationContainer: {
    padding: 16,
    top: 0,
  },
});
