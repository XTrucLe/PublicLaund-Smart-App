import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
// Hàm lập lịch thông báo cục bộ
const schedulePushNotification = async (seconds: number) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Thông báo từ ứng dụng giặt!",
        body: `Chỉ còn ${seconds / 60} phút trước khi hết giờ.`,
        data: { data: 'data goes here' },
      },
      trigger: { seconds }, // Thời gian (s) để gửi thông báo
    });
  };