import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MachineUsageView from "@/components/machine/MachineUsageView";
import { notificationListeners, registerForPushNotificationsAsync, removeNotificationListeners, schedulePushNotification } from "@/service/noticeService";

export default function HomeScreen() {
  const machine = {
    capacity: 15,
    id: 1,
    locationAddress: "03 Quang Trung, Hải Châu, Đà Nẵng",
    locationId: 3,
    locationName: "Tòa văn phòng",
    model: "LG-4500",
    name: "Máy Giặt LG 4500",
    status: "reserved",
    time: 10,
  };
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<any>(false);
  const [listeners, setListeners] = useState<any>({});

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Đăng ký lắng nghe thông báo
    const { notificationListener, responseListener } = notificationListeners(setNotification);
    setListeners({ notificationListener, responseListener });

    return () => {
      // Hủy đăng ký lắng nghe khi component unmount
      removeNotificationListeners(listeners.notificationListener, listeners.responseListener);
    };
  }, []);

  const handleNotice = async () => {
    await schedulePushNotification(1, 'Chỉ còn 5 phút trước khi hết giờ.');
    await schedulePushNotification(0.15, 'Thời gian đã hết!');
    console.log("Notice");
  }
  return (
    <View style={{ flex: 1 }}>
      <MachineUsageView timeRemaining={machine.time} {...machine} />
      <Pressable onPress={handleNotice}><Text>Press it</Text></Pressable>
    </View>
  );
}
