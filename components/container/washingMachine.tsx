import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface MachineViewProps {
  machineNumber: number; // Số máy
  status: "running" | "available" | "maintenance"; // Trạng thái của máy
}

const MachineView: React.FC<MachineViewProps> = ({ machineNumber, status }) => {
  // Xác định màu sắc theo trạng thái
  const statusColors = {
    running: "green",       // Máy đang chạy
    available: "blue",      // Máy sẵn sàng
    maintenance: "orange",  // Máy đang bảo trì
  };

  // Xác định màu sắc cho nút đang hoạt động
  const getButtonStyle = (
    currentStatus: "running" | "available" | "maintenance"
  ): ViewStyle => {
    return {
      backgroundColor:
        currentStatus === status ? statusColors[currentStatus] : "lightgray",
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      width: 20,
      height: 20,
    };
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị số máy */}
      <Text style={styles.machineNumber}>Machine #{machineNumber}</Text>

      {/* Biểu tượng máy giặt */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="local-laundry-service" size={75} color="black" />
      </View>
      <Text style={styles.statusText}>{status}</Text>
      {/* Các nút trạng thái */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={getButtonStyle("running")}></TouchableOpacity>

        <TouchableOpacity style={getButtonStyle("available")}></TouchableOpacity>

        <TouchableOpacity style={getButtonStyle("maintenance")}></TouchableOpacity>
      </View>
    </View>
  );
};

// Định nghĩa style cho component
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    margin: 8,
    borderRadius: 8,
    userSelect: 'none',
    cursor: "pointer"
  },
  machineNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  iconContainer: {
    marginBottom: 30,
  },
  statusText:{
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default MachineView;
