import {
  startUsingMachine,
  cancelUsingMachine,
} from "@/service/ReservationService";
import { useState } from "react";
import { Alert, AlertButton } from "react-native";

// Hàm showAlert được tách ra ngoài để dễ tái sử dụng
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

  const startLaundry = async (id: number) => {
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
            const response = await startUsingMachine();
            if (response !== 200) {
              throw new Error("Không thể bắt đầu máy giặt.");
            }
            showAlert(
              "Bắt đầu thành công",
              `Máy giặt số ${id} đã được bắt đầu.`
            );
            setIsRunning(true);
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Không thể bắt đầu máy giặt. Vui lòng thử lại.";
            showAlert("Lỗi", errorMessage);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const cancelLaundry = async (id: number) => {
    if (!isRunning) {
      showAlert("Thông báo", "Máy giặt chưa bắt đầu.");
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
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Không thể hủy máy giặt. Vui lòng thử lại.";
            showAlert("Lỗi", errorMessage);
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
