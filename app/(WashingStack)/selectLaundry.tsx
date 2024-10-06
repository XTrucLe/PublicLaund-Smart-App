import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import LaundryOption from "../../src/container/washing/laundryOption";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/container/washing/type";
import { Ionicons } from "@expo/vector-icons";
import { typeWashing } from "@/src/service/machineService";

// Kiểu cho navigation prop
type SelectLaundryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SelectLaundry"
>;

function SelectLaundry() {
  const { machineId } = useLocalSearchParams<{ machineId: string }>();
  const [selectedLaundry, setSelectedLaundry] = useState<{
    id: number;
    name: string;
    duration: string;
    price: number;
  } | null>(null);

  const navigation = useNavigation<SelectLaundryScreenNavigationProp>();

  const handleSelect = (item: {
    id: number;
    name: string;
    duration: string;
    price: number;
  }) => {
    setSelectedLaundry(item);
    console.log(machineId + " selected " + item.name);
  };

  const handleNext = () => {
    if (!selectedLaundry) {
      return alert("Vui lòng chọn loại đồ giặt trước khi tiếp tục.");
    }

    navigation.navigate({
      name: "LaundryDetail",
      params: {
        washingType: selectedLaundry,
        machineId: machineId,
      },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Máy giặt số {machineId}</Text>
      </View>
      <Text style={styles.title}>Chọn loại đồ giặt:</Text>
      {typeWashing.map((item) => (
        <LaundryOption
          key={item.id}
          name={item.name}
          onSelect={() => handleSelect(item)}
          isSelected={item.id === selectedLaundry?.id}
        />
      ))}
      <Pressable onPress={handleNext} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Next</Text>
        <Ionicons
          name="arrow-forward"
          size={16}
          color="#fff"
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Helvetica",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#4caf50", // Màu nền của nút
    paddingVertical: 10, // Độ dày của nút
    paddingHorizontal: 20, // Độ rộng của nút
    borderRadius: 20, // Bo góc nút
    alignSelf: "flex-end", // Đặt nút bên phải
    marginTop: 20, // Khoảng cách trên của nút
    shadowColor: "#000", // Thêm shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // Độ nổi (Android)
  },
  buttonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Chữ đậm
    textAlign: "center", // Căn giữa chữ trong nút
  },
  icon: {
    marginLeft: 8,
    marginTop:1
  },
});

export default SelectLaundry;
