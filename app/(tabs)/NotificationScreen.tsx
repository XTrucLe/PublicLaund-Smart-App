import NotificationItem from "@/components/items/noticeItem";
import getNotifications, {
  Notification,
  notificationsData,
} from "@/service/noticeService";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(notificationsData);
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        {notifications.map((notification) => (
          <NotificationItem {...notification} />
        ))}
      </ScrollView>
    </View>
  );
}
