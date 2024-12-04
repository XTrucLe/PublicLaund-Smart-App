import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { BarcodeScanningResult } from "expo-camera/build/Camera.types";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/components/navigation";

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

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    //check if the scanned data is a number
    if (isNaN(Number(data))) {
      alert("QR code không hợp lệ!");
      return;
    }
    navigation.navigate("MachineDataScreen", { machineId: Number(data) });
  };

  if (hasPermission === null) {
    return <Text>Đang xin quyền truy cập camera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không có quyền truy cập camera!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quét Mã QR</Text>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={(ref) => setCameraRef(ref)}
      />
      {scanned && (
        <Button title={"Quét lại"} onPress={() => setScanned(false)} />
      )}
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
    width: "90%",
    height: "75%",
  },
});

export default QRCodeScreen;
