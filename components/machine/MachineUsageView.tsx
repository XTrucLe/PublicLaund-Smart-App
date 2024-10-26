import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  ActivityIndicator,
  AlertButton,
} from "react-native";
import { Machine } from "@/service/machineService";
import {
  cancelUsingMachine,
  startUsingMachine,
} from "@/service/ReservationService";
import TimeCountdown from "../clock/TimeCoundown";

const MachineUsageView: React.FC<Machine & { timeRemaining: number }> = ({
  id,
  capacity,
  model,
  locationName,
  timeRemaining,
  status,
}) => {
  const [machineStarted, setMachineStarted] = useState(status === "in_use");
  const [countdownTime, setCountdownTime] = useState(timeRemaining * 60);
  const [loading, setLoading] = useState(false); // Khởi tạo với false

  const showAlert = (
    title: string,
    message?: string,
    buttons?: AlertButton[]
  ) => {
    Alert.alert(title, message, buttons);
  };

  const handleComplete = () => {
    showAlert("Thông báo", `Máy giặt số ${id} đã hoàn thành.`);
  };

  const handleNotice = () => {
    showAlert("Thông báo", `Máy giặt số ${id} sắp hoàn thành.`);
  };

  const handleStart = async () => {
    showAlert("Bắt đầu", `Bắt đầu sử dụng máy giặt số ${id}.`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đồng ý",
        onPress: async () => {
          setLoading(true);
          try {
            const response = await startUsingMachine(id);
            if (response !== 200) {
              throw new Error("Không thể bắt đầu máy giặt.");
            }
            setMachineStarted(true);
            setCountdownTime(timeRemaining * 60);
            showAlert(
              "Bắt đầu thành công",
              `Máy giặt số ${id} đã được bắt đầu.`
            );
          } catch {
            showAlert("Lỗi", "Không thể bắt đầu máy giặt. Vui lòng thử lại.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleCancel = async () => {
    if (status === "reserved") {
      showAlert("Hủy đặt chỗ", `Bạn có chắc chắn muốn hủy máy giặt số ${id}?`, [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đồng ý",
          onPress: async () => {
            setLoading(true);
            try {
              const response = await cancelUsingMachine(id);
              if (response !== 200) {
                Alert.alert("Không thể hủy máy giặt.");
              }
              showAlert("Hủy thành công", `Máy giặt số ${id} đã được hủy.`);
            } catch {
              showAlert("Lỗi", "Không thể hủy máy giặt. Vui lòng thử lại.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.machineText}>Máy giặt số #{id}</Text>
          <Text style={styles.detailsText}>Dung tích: {capacity} kg</Text>
          <Text style={styles.detailsText}>Model: {model}</Text>
          <Text style={styles.detailsText}>Vị trí: {locationName}</Text>
          {status === "reserved" && (
            <Text style={styles.timerText}>
              Thời gian giặt: {timeRemaining} phút
            </Text>
          )}
        </View>

        {machineStarted && (
          <View style={styles.timerContainer}>
            <TimeCountdown
              duration={countdownTime}
              noticeTime={300}
              onNotice={handleNotice}
              onComplete={handleComplete}
              start={machineStarted}
            />
          </View>
        )}
      </View>

      {status === "reserved" && !machineStarted && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleStart} disabled={loading}>
            <Text style={styles.startButton}>Bắt đầu</Text>
          </Pressable>
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color="#fff"
            />
          )}

          <Pressable onPress={handleCancel} disabled={loading}>
            <Text style={[styles.startButton, { backgroundColor: "red" }]}>
              Hủy
            </Text>
          </Pressable>
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color="#fff"
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 600,
    elevation: 3,
  },
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  detailsContainer: {
    marginBottom: 8,
    alignItems: "flex-start",
    flex: 1,
  },
  machineText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  detailsText: {
    fontSize: 14,
    color: "#666",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 8,
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  startButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  loadingIndicator: {
    marginLeft: 10, // Thêm khoảng cách giữa nút và indicator
  },
});

export default MachineUsageView;
