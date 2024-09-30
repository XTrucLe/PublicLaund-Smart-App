import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface MachineViewProps {
  machineNumber: number; // Số máy
  status: "on" | "off" | "maintenance"; // Trạng thái của máy
}

const MachineView: React.FC<MachineViewProps> = ({ machineNumber, status }) => {
  // Xác định màu sắc theo trạng thái
  const statusColors = {
    on: "green",
    off: "red",
    maintenance: "yellow",
  };

  // Xác định màu sắc cho nút đang hoạt động
  const getButtonStyle = (
    currentStatus: "on" | "off" | "maintenance"
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

      <View style={[styles.iconContainer]}>
      <MaterialIcons name="local-laundry-service" size={75} color="black" />
      </View>

      {/* Các nút trạng thái */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={getButtonStyle("on")}>
        </TouchableOpacity>

        <TouchableOpacity style={getButtonStyle("off")}>
        </TouchableOpacity>

        <TouchableOpacity style={getButtonStyle("maintenance")}>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Định nghĩa style cho component
const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    minWidth: 200,
    aspectRatio: 3/4
  },
  machineNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "10%", // Chiều rộng đầy đủ cho các nút
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default MachineView;
