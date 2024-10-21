import React from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Machine } from "@/service/machineService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";

const MachineView: React.FC<Machine> = ({
  id,
  name,
  status,
  capacity,
  model,
  locationName,
}) => {
  const navigation = useNavigation<NavigationProps<"MachineScreen">>();
  status = status.toLowerCase();
  // Xác định màu sắc theo trạng thái
  const statusColors: { [key: string]: string } = {
    in_use: "green", // Máy đang sử dụng
    available: "blue", // Máy sẵn sàng
    maintenance: "orange", // Máy đang bảo trì
    error: "red", // Máy bị lỗi
  };

  const handlePress = () => {
    if (status === "available") {
      navigation.navigate("OptionsScreen", { id });
    } else {
      Alert.alert("Thông báo", `Máy giặt hiện đang ở trạng thái: ${status}.`, [
        { text: "OK" },
      ]);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
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
    flex: 1,
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
  detailsContainer: {
    flex: 1,
    marginLeft: 10, // Khoảng cách giữa icon và phần thông tin
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 14,
    color: "#555", // Màu chữ cho chi tiết thêm
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
