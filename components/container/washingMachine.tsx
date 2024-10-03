import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Alert,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

interface MachineViewProps {
  machineNumber: number; // Số máy
  status: "running" | "available" | "maintenance"; // Trạng thái của máy
}


const MachineView: React.FC<MachineViewProps> = ({ machineNumber, status}) => {
  const router= useRouter()

  // Xác định màu sắc theo trạng thái
  const statusColors = {
    running: "green", // Máy đang chạy
    available: "blue", // Máy sẵn sàng
    maintenance: "orange", // Máy đang bảo trì
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
      margin: 4,
      width: 15,
      height: 15,
    };
  };

  const handlePress = () => {
    if (status === "available") {
      router.push({
        pathname: '/selectLaundry', 
        params:{
          machineId: machineNumber
        }
      })
    } else {
      // Hiển thị alert cho trạng thái khác
      Alert.alert("Thông báo", `Máy giặt hiện đang ở trạng thái: ${status}.`, [
        { text: "OK" },
      ]);
    }
  };

  return (
    <Pressable onPress={handlePress}>
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
          <View style={getButtonStyle("running")}></View>
          <View style={getButtonStyle("available")}></View>
          <View style={getButtonStyle("maintenance")}></View>
        </View>
      </View>
    </Pressable>
  );
};

// Định nghĩa style cho component
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    margin: 8,
    borderRadius: 8,
    maxWidth: 180,
    aspectRatio: 3 / 5,
  },
  machineNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  iconContainer: {
    marginBottom: 15,
  },
  statusText: {
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
});

export default MachineView;
