import { realtimeDB } from "@/hooks/useFirebaseDatabase";
import { useEffect, useState } from "react";
import { ref, DataSnapshot, onValue, off } from "firebase/database";
type MachineRealtime = {
  id: number;
  status: string;
};
export default function useRealtime() {
  const [machineStatus, setMachineStatus] = useState<MachineRealtime[] | null>(
    null
  );
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    // Tạo một tham chiếu đến đường dẫn 'machine' trong Firebase Realtime Database
    const machineStatusRef = ref(realtimeDB, "machine");

    // Hàm callback xử lý cập nhật từ cơ sở dữ liệu
    const handleStatusChange = (snapshot: DataSnapshot) => {
      // Cập nhật machineStatus với dữ liệu mới nhất từ snapshot
      setMachineStatus(snapshot.val());
      // Cập nhật trạng thái cập nhật
      setIsUpdate(true);
    };

    // Thiết lập listener để nhận dữ liệu theo thời gian thực từ Firebase
    onValue(machineStatusRef, handleStatusChange);

    // Hủy listener khi component bị unmount
    return () => {
      off(machineStatusRef, "value", handleStatusChange);
    };
  }, []);

  // Hàm kiểm tra trạng thái của máy giặt dựa trên ID máy
  const checkStatus = (machineId: number) => {
    return machineStatus?.find(
      (machine) =>
        machine.id === machineId && machine.status.toLowerCase() == "available"
    );
  };

  const resetUpdateStatus = () => {
    setIsUpdate(false);
  };
  return { machineStatus, checkStatus, isUpdate, resetUpdateStatus };
}
