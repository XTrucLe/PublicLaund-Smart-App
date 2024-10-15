import React from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Machine } from "@/service/machineService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";

const MachineView: React.FC<Machine> = ({ machineNumber, status }) => {
  const navigation = useNavigation<NavigationProps<"MachineScreen">>();

  // Xác định màu sắc theo trạng thái
  const statusColors: { [key: string]: string } = {
    running: "green", // Máy đang chạy
    available: "blue", // Máy sẵn sàng
    maintenance: "orange", // Máy đang bảo trì
    error: "red", //Máy bị lỗi
  };

  const handlePress = () => {
    if (status === "available") {
      navigation.navigate("OptionsScreen", {
        machineId: machineNumber,
      });
    } else {
      // Hiển thị alert cho trạng thái khác
      Alert.alert("Thông báo", `Máy giặt hiện đang ở trạng thái: ${status}.`, [
        { text: "OK" },
      ]);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {/* Icon máy giặt ở phía đầu */}
      <MaterialIcons
        name="local-laundry-service"
        size={24}
        color="#000"
        style={styles.icon}
      />

      {/* Số máy giặt */}
      <Text style={styles.machineText}>Máy giặt số #{machineNumber}</Text>

      {/* Nút trạng thái */}
      <View>
        <Text style={styles.buttonText}>{status}</Text>
      </View>

      {/* Ô tròn hiển thị màu trạng thái */}
      <View
        style={[
          styles.statusCircle,
          { backgroundColor: statusColors[status] || "lightgray" },
        ]}
      />
    </Pressable>
  );
};

// Định nghĩa style cho component
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row", // Đặt các phần tử thành hàng ngang
    alignItems: "center", // Căn giữa theo trục dọc
    justifyContent: "space-between", // Khoảng cách giữa các phần tử
    padding: 18,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    opacity: 0.9,
  },
  machineText: {
    flex: 1, // Chiếm không gian còn lại giữa icon và nút
    fontSize: 16,
  },
  icon: {
    marginRight: 10, // Khoảng cách giữa icon và text
  },
  buttonText: {
    fontWeight: "bold",
  },
  statusCircle: {
    width: 16, // Kích thước của ô tròn
    height: 16,
    borderRadius: 8,

    marginLeft: 10, // Khoảng cách giữa nút và ô tròn
  },
});

export default MachineView;
