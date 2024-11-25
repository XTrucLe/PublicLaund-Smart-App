import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "@/components/navigation/type";
import HeaderText from "@/components/headerText";
import InformationRow from "@/components/items/confirmItem";
import { reservationMachine } from "@/service/ReservationService";

// Định nghĩa kiểu dữ liệu cho navigation
type ConfirmScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "ConfirmScreen"
>;

export default function ConfirmScreen() {
  const route = useRoute<RouteProp<RootParamList, "ConfirmScreen">>();
  const { id, washingType } = route.params;

  // Sử dụng hook useNavigation để lấy đối tượng navigation
  const navigation = useNavigation<ConfirmScreenNavigationProp>();

  const handleConfirm = () => {
    reservationMachine({
      machineId: id,
      washingTypeId: washingType.id,
    }).then((response) => {
      let success = response?.status === 200;
      console.log("🚀 ~ handleConfirm ~ response", response);
      navigation.navigate("NoticeStatus", {
        success: success,
        message: response?.data.message,
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <HeaderText text={"Máy giặt: " + id} />

      {/* Thông tin chi tiết */}
      <View style={styles.infoContainer}>
        <InformationRow label="Loại giặt" value={washingType.typeName} />
        <InformationRow
          label="Thời gian"
          value={`${washingType.defaultDuration} phút`}
        />
        <InformationRow
          label="Giá"
          value={`${washingType.defaultPrice.toLocaleString("vi-VN")} VND`}
        />
      </View>

      {/* Nút Xác nhận */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleConfirm} style={styles.button}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Xác nhận</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F0F8FF", // Tạo nền xanh nhạt
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Đổ bóng cho Android
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4682B4", // Màu chữ xanh dương
    textAlign: "center",
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF", // Màu trắng cho vùng thông tin
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Đổ bóng nhẹ cho phần thông tin
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "auto",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
  },
});
