import { useState } from "react";
import { realtimeDB } from "@/firebaseConfig";
import { push, ref } from "@firebase/database";

export function useCreateNotification() {
  const [isLoading, setIsLoading] = useState(false);

  const createNotification = async (userId: number, notification: object) => {
    if (!userId || !notification) {
      console.error("Invalid userId or notification");
      return;
    }

    setIsLoading(true);
    try {
      const noticeRef = ref(realtimeDB, `notification/${userId}`);
      const result = await push(noticeRef, { message: notification, timestamp: Date.now() });
      console.log(
        "Notification created with key: ",
        result.key,
        "\nNotification content:",
        notification
      );
    } catch (error) {
      console.error("Failed to create notification: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createNotification, isLoading };
}
