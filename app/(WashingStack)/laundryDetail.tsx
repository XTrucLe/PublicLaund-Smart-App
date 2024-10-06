import React from "react";
import { View, Button, StyleSheet } from "react-native";
import InfoRow from "@/src/container/washing/inforRow";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/container/washing/type";
import HeaderText from "@/src/container/theme/HeaderText";

type LaundryDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LaundryDetail"
>;

export default function LaundryDetail() {
  const route = useRoute();
  const { washingType, machineId } = route.params as {
    washingType: {
      id: number;
      name: string;
      duration: string;
      price: number;
    };
    machineId: string;
  };
  const navigation = useNavigation<LaundryDetailScreenNavigationProp>();

  const handleConfirm = () => {
    navigation.navigate({
      name: "Confirm",
      params: { washingType, machineId },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <HeaderText text={"Máy giặt: " + machineId} />

      {/* Thông tin chi tiết */}
      <View style={styles.infoContainer}>
        <InfoRow label="Loại giặt" value={washingType.name} />
        <InfoRow label="Thời gian" value={washingType.duration} />
        <InfoRow label="Giá" value={`${washingType.price} VND`} />
      </View>

      {/* Nút Xác nhận */}
      <View style={styles.buttonContainer}>
        <Button title="Xác nhận" onPress={handleConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F8FF', // Tạo nền xanh nhạt
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Đổ bóng cho Android
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4682B4', // Màu chữ xanh dương
    textAlign: 'center',
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF', // Màu trắng cho vùng thông tin
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Đổ bóng nhẹ cho phần thông tin
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});