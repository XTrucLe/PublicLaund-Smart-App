import { useState } from "react";
import { realtimeDB } from "@/firebaseConfig";
import { get, push, ref, set } from "@firebase/database";
import getNotifications from "./../service/PushNotification";

export function useNotificationFirebase() {
  const [isLoading, setIsLoading] = useState(false);

  const createNotification = async (
    userId: number,
    title: string,
    message: string
  ) => {
    if (!userId || !title || !message) {
      console.error("Invalid userId, title or message");
      return;
    }

    setIsLoading(true);
    try {
      const noticeRef = ref(realtimeDB, `notification/${userId}`);
      const notificationData = {
        title,
        message,
        dateCreated: Date.now(),
        isRead: false,
      };
      const result = await push(noticeRef, notificationData);
      console.log("Notification created with key:", result.key);
      console.log("Notification content:", notificationData);
    } catch (error) {
      console.error("Failed to create notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotifications = async (userId: number) => {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }

    setIsLoading(true);
    const noticeRef = ref(realtimeDB, `notification/${userId}`);

    try {
      const snapshot = await get(noticeRef);

      if (snapshot.exists()) {
        const notifications = snapshot.val(); // Không cần await ở đây
        const result = Object.entries(notifications).map(([id, data]) => ({
          id,
          ...(typeof data === "object" && data !== null ? data : {}),
        }));

        return result;
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Failed to get notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setReadNotification = async (
    userId: number,
    notificationId: number
  ) => {
    if (!userId || !notificationId) {
      console.error("Invalid userId or notificationId");
      return;
    }

    setIsLoading(true);
    try {
      const noticeRef = ref(
        realtimeDB,
        `notification/${userId}/${notificationId}`
      );
      await set(noticeRef, { isRead: true });
      console.log("Notification marked as read:", notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createNotification,
    getNotifications,
    setReadNotification,
    isLoading,
  };
}
