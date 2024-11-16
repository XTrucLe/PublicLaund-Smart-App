import { ref, set, get, child } from 'firebase/database';
import { realtimeDB } from '@/hooks/useFirebaseDatabase'; 

// Hàm thêm thông báo cho người dùng trong Realtime Database
export async function addNotification(userId: number, title: string, body: string) {
    const notificationData = {
        title: title,
        body: body,
        createdAt: new Date().toISOString(), // Thời gian tạo thông báo
        read: false // Trạng thái đọc
    };

    // Lưu thông báo vào Realtime Database
    const notificationRef = ref(realtimeDB, `notifications/${userId}`);
    await set(notificationRef, {
        [new Date().toISOString()]: notificationData // Lưu thông báo với thời gian tạo là key
    });
}

// Hàm lấy thông báo của người dùng từ Realtime Database
export async function getUserNotifications(userId: number) {
    const dbRef = ref(realtimeDB);
    const snapshot = await get(child(dbRef, `notifications/${userId}`));

    if (snapshot.exists()) {
        return snapshot.val(); // Trả về dữ liệu thông báo
    } else {
        console.log('No notifications found for this user');
        return {};
    }
}

// Hàm lấy toàn bộ thông báo của người dùng từ Realtime Database
export async function getAllUserNotifications() {
    const dbRef = ref(realtimeDB);
    const snapshot = await get(child(dbRef, `notifications`));

    if (snapshot.exists()) {
        const notifications = snapshot.val();
        const allNotifications = Object.values(notifications); // Chuyển đổi thành mảng nếu cần
        return allNotifications; // Trả về toàn bộ thông báo
    } else {
        console.log('No notifications found for this user');
        return [];
    }
}
