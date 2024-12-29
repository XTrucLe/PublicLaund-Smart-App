import NotificationItem from "@/components/items/notificationItem";
import getNotifications, { Notification } from "@/service/PushNotification";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setRefreshing(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <ScrollView
      style={styles.notificationContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchNotifications}
        />
      }
    >
      {notifications
        .slice()
        .reverse()
        .map((notification) => (
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
