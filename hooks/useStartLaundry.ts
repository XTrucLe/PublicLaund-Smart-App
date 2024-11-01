import { startUsingMachine, cancelUsingMachine } from "@/service/ReservationService";
import { useState } from "react";
import { Alert, AlertButton } from "react-native";

const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
) => {
  Alert.alert(title, message, buttons);
};

const useLaundry = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const startLaundry = (id: number) => {
    if (isRunning) {
      showAlert("Thông báo", "Máy giặt đang chạy.");
      return;
    }

    showAlert("Bắt đầu", `Bắt đầu sử dụng máy giặt số ${id}.`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đồng ý",
        onPress: async () => {
          setLoading(true);
          try {
            const response = await startUsingMachine(id);
            // if (response !== 200) {
            //   throw new Error("Không thể bắt đầu máy giặt.");
            // }
            showAlert(
              "Bắt đầu thành công",
              `Máy giặt số ${id} đã được bắt đầu.`
            );
            setIsRunning(true);
          } catch (error) {
            showAlert("Lỗi", (error as any).message || "Không thể bắt đầu máy giặt. Vui lòng thử lại.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const cancelLaundry = async (id: number) => {
    if (isRunning) {
      showAlert("Thông báo", "Máy giặt đã bắt đầu.");
      return;
    }

    showAlert("Hủy", `Bạn có chắc chắn muốn hủy máy giặt số ${id}?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đồng ý",
        onPress: async () => {
          setLoading(true);
          try {
            const response = await cancelUsingMachine(id);
            if (response !== 200) {
              throw new Error("Không thể hủy máy giặt.");
            }
            showAlert("Hủy thành công", `Máy giặt số ${id} đã được hủy.`);
            setIsRunning(false);
          } catch (error) {
            showAlert("Lỗi", (error as any).message || "Không thể hủy máy giặt. Vui lòng thử lại.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return {
    isRunning,
    startLaundry,
    cancelLaundry,
    loading,
  };
};

export default useLaundry;
