import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const isScheduled = async (item:string) => {
    const pending = await AsyncStorage.getItem(item);
    return pending !== null;
  }
// Hàm lập lịch thông báo cục bộ
const schedulePushNotification = async (seconds: number,message:string="", endTime?:number,times:number=1) => {
  const checkPermission = await Notifications.getPermissionsAsync();
  var key= `notification-${endTime}-${times}`;

  //nếu thông báo chưa được tạo thì tạo mới
  if(await isScheduled(key)){
    console.log(`Thông báo ${key} đã được lên lịch.`);
    
    return;
  }

  //nếu quyền thông báo chưa được cấp thì cấp quyền
  if (!checkPermission.granted) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Thông báo từ ứng dụng giặt ủi!",
        body: `Chỉ còn ${seconds / 60} phút trước khi hết giờ.`,
        data: { data: 'data goes here' },
      },
      trigger: { seconds }, // Thời gian (s) để gửi thông báo
    });
  }

  //lưu key vào AsyncStorage để kiểm tra thông báo đã được tạo
  await AsyncStorage.setItem(key, 'true');
  console.log(`Thông báo ${key} cho máy giặt đã được lên lịch.`);

  };
export {schedulePushNotification};