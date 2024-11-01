import React from "react";
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
import TimeCountdown from "../clock/TimeCoundown";
import useLaundry from "@/hooks/useStartLaundry";

const MachineUsageView: React.FC<Machine & { timeRemaining: number }> = ({
  id,
  name,
  capacity,
  model,
  locationName,
  timeRemaining,
  status,
}) => {
  const { isRunning, startLaundry, cancelLaundry, loading } = useLaundry(); // Sử dụng hook

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.machineText} numberOfLines={1} ellipsizeMode="tail">
          Máy giặt số #{id}
        </Text>
        {/* Vòng tròn trạng thái */}
        <View
          style={[
            styles.statusCircle,
            { backgroundColor: status === "reserved" ? "green" : "red" },
          ]}
        />
      </View>

      {/* Content */}
      <View style={styles.mainContainer}>
        <View style={styles.detailsContainer}>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Tên máy: {name}
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Dung tích: {capacity} kg
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Model: {model}
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Vị trí: {locationName}
          </Text>
          {status === "reserved" && (
            <Text style={styles.timerText}>
              Thời gian giặt: {timeRemaining} phút
            </Text>
          )}
        </View>

        {isRunning ? (
          <View style={styles.timerContainer}>
            <TimeCountdown
              duration={timeRemaining * 60}
              noticeTime={300}
              onNotice={handleNotice}
              onComplete={handleComplete}
              start={isRunning}
            />
          </View>
        ) : (
          status === "reserved" && (
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => startLaundry(id)} disabled={loading}>
                <Text style={styles.startButton}>Bắt đầu</Text>
              </Pressable>
              {loading && (
                <ActivityIndicator
                  style={styles.loadingIndicator}
                  size="small"
                  color="#fff"
                />
              )}

              <Pressable onPress={() => cancelLaundry(id)} disabled={loading}>
                <Text style={[styles.startButton, { backgroundColor: "red" }]}>
                  Hủy
                </Text>
              </Pressable>
            </View>
          )
        )}
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f7f7f7",
    marginBottom: 12,
    overflow: "hidden",
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#b3e5fc",
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  mainContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
  },
  timerText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  timerContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 16,
    width: 160,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  startButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#4caf50",
    color: "#fff",
    textAlign: "center",
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  overlay: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền tối với độ mờ
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MachineUsageView;
