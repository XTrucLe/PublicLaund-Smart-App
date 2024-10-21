import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Machine } from "@/service/machineService";
import TimeCountdown from "../clock/TimeCoundown";

const MachineUsageView: React.FC<Machine & { timeRemaining: number }> = ({
  id,
  capacity,
  model,
  locationName,
  timeRemaining,
  status,
}) => {
  // Xử lý hành động dựa trên trạng thái
  const handleAction = () => {
    if (status === "reserved") {
      Alert.alert("Bắt đầu giặt", `Máy giặt số ${id} sẽ bắt đầu.`);
    } else if (status === "in_use") {
      Alert.alert("Thông báo", `Máy giặt số ${id} đang hoạt động.`);
    }
  };

  // Xử lý hủy đặt chỗ nếu trạng thái là reserved
  const handleCancel = () => {
    if (status === "reserved") {
      Alert.alert("Hủy đặt chỗ", `Bạn đã hủy đặt chỗ cho máy giặt số ${id}.`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Icon máy giặt */}
      <MaterialIcons
        name="local-laundry-service"
        size={24}
        color="#000"
        style={styles.icon}
      />

      {/* Thông tin máy giặt */}
      <View style={styles.detailsContainer}>
        <Text style={styles.machineText}>Máy giặt số #{id}</Text>
        <Text style={styles.detailsText}>Dung tích: {capacity} kg</Text>
        <Text style={styles.detailsText}>Model: {model}</Text>
        <Text style={styles.detailsText}>Vị trí: {locationName}</Text>
      </View>

      {/* Bộ đếm thời gian */}
      <Text style={styles.timerText}>
        Thời gian còn lại: {timeRemaining} phút
      </Text>

      {/* Nút Action (Start/Notify) và hủy */}
      <View style={styles.buttonContainer}>
        {status === "reserved" ? (
          <View style={{ flexGrow: 1 }}>
            <Text>
              Vui lòng nhấn Start trong vòng 15 phút.{"\n"}Sau thời gian trên,
              giao dịch sẽ bị hủy
            </Text>
            <TimeCountdown duration={timeRemaining * 60} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Hiển thị các thành phần theo chiều dọc
    alignItems: "center", // Căn giữa các thành phần theo chiều ngang
    justifyContent: "space-between", // Khoảng cách giữa các thành phần
    padding: 18,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    opacity: 0.9,
  },
  detailsContainer: {
    marginBottom: 10, // Khoảng cách giữa thông tin máy và bộ đếm
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column", // Hiển thị các nút theo chiều dọc
    width: "100%", // Chiều rộng tối đa cho các nút
    alignItems: "center", // Căn giữa các nút
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    marginBottom: 10, // Khoảng cách giữa icon và thông tin máy
  },
});

export default MachineUsageView;
