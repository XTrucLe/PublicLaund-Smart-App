import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { BarcodeScanningResult } from "expo-camera/build/Camera.types";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/components/navigation";
import { checkCode } from "@/service/machineService";

const QRCodeScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const navigation = useNavigation<NavigationProps<"QRCodeScreen">>();

  const requestCameraPermission = async (navigation: any) => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      setHasPermission(true); // Cấp quyền thành công
    } else {
      setHasPermission(false); // Từ chối quyền
      Alert.alert(
        "Quyền truy cập camera",
        "Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // Quay lại màn hình trước khi quyền bị từ chối
            style: "cancel",
          },
        ]
      );
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      console.log(status);

      if (status === "granted") {
        setHasPermission(true); // Cấp quyền trước nếu đã có
      } else if (status === "denied") {
        // Nếu quyền bị từ chối, yêu cầu quyền lại
        requestCameraPermission(navigation);
      } else if (status === "undetermined") {
        // Nếu chưa yêu cầu quyền, yêu cầu quyền
        requestCameraPermission(navigation);
      }
    };

    checkPermission();
  }, [navigation]);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarcodeScanningResult) => {
    setScanned(true);

    console.log("Dữ liệu quét được:", data);

    // Tách dữ liệu theo ký tự "|"
    const result = data.split("|");
    if (result.length === 0 || !result[0]) {
      Alert.alert("Mã QR không hợp lệ", "Vui lòng quét lại mã QR khác", [
        {
          text: "OK",
          onPress: () => setTimeout(() => setScanned(false), 4000),
          style: "cancel",
        },
      ]);
      return;
    }

    console.log("Kết quả tách:", result);

    // Kiểm tra tính hợp lệ của mã
    let isCheckValid = false;
    try {
      const response = await checkCode(result[0]); // Đảm bảo checkCode là async
      console.log("Kết quả kiểm tra:", response);
      isCheckValid = Boolean(response);
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã QR:", error);
      isCheckValid = false;
    }

    if (!isCheckValid) {
      Alert.alert("Mã QR không hợp lệ", "Vui lòng quét lại mã QR khác", [
        {
          text: "OK",
          onPress: () => setTimeout(() => setScanned(false), 5000),
          style: "cancel",
        },
      ]);
      return;
    }

    // Nếu mã hợp lệ, điều hướng đến màn hình khác
    navigation.navigate("MachineDataScreen", {
      secretId: result[1],
      hashKey: result[0],
    });
  };

  if (hasPermission === null) {
    return <Text>Đang xin quyền truy cập camera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không có quyền truy cập camera!</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={(ref) => setCameraRef(ref)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});

export default QRCodeScreen;
