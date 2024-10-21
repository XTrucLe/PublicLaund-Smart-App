import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Machine } from "@/service/machineService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";

const AvailableMachineView: React.FC<Machine> = ({
  id,
  name,
  status,
  capacity,
  model,
  locationName,
}) => {
  const navigation = useNavigation<NavigationProps<"MachineScreen">>();

  const handleNavigate = () => {
    navigation.navigate("OptionsScreen", { id });
  };

  // Function to return color and label based on machine status
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return { color: "blue", label: "Available" };
      case "reserved":
        return { color: "orange", label: "Reserved" };
      case "in_use":
        return { color: "green", label: "In Use" };
      case "error":
        return { color: "red", label: "Error" };
      default:
        return { color: "gray", label: "Unknown" };
    }
  };

  // Get the color and label for the current status
  const { color, label } = getStatusInfo(status);

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
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
        style={[styles.statusCircle, { backgroundColor: color || "lightgray" }]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    opacity: 0.9,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
  },
  icon: {
    marginRight: 10,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
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

export default AvailableMachineView;
