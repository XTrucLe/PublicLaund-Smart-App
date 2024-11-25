import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { useRoute } from "@react-navigation/native";
import { RouteProps } from "@/components/navigation";
import { getTopUpLink } from "@/service/walletService";

type transactionInfo = {
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
};

const ShowQRCodeScreen = () => {
  const route = useRoute<RouteProps<"ShowQRCodeScreen">>();
  const { amount } = route.params;
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);
  const [QRValue, setQRValue] = useState("null"); // URL hoặc giá trị QR
  const [transactionInfo, setTransactionInfo] = useState<transactionInfo>({
    accountNumber: "",
    accountName: "",
    amount: 0,
    description: "",
  });
  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    // Kiểm tra trạng thái quyền khi ứng dụng khởi động
    (async () => {
      const { status } = await MediaLibrary.getPermissionsAsync();
      setHasMediaLibraryPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await getTopUpLink(amount, "Bagus Yuliono");
        setQRValue(response?.qrCode);
        setTransactionInfo({ ...response });

        console.log(transactionInfo);
      } catch (error) {
        console.log("Show QR", error);
      }
    };
    fetchLink();
  }, []);

  // Yêu cầu quyền nếu cần thiết
  const requestPermissionIfNeeded = async () => {
    if (
      hasMediaLibraryPermission === null ||
      hasMediaLibraryPermission === false
    ) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need permission to save QR codes to your photo gallery."
        );
      }
    }
  };

  const handleShare = async () => {
    const uri = await captureQRCode();
    if (uri) {
      try {
        await Share.share({
          title: "Share QR Code",
          url: uri,
          message: "Here is your QR code for top-up!",
        });
      } catch (error) {
        console.error("Error sharing QR code:", error);
        Alert.alert("Error", "Failed to share QR code.");
      }
    }
  };

  // Hàm chụp ảnh mã QR
  const captureQRCode = async () => {
    const viewShot = viewShotRef.current;
    if (!viewShot) {
      console.warn("ViewShot reference is undefined");
      return null;
    }

    try {
      // Chụp ảnh QR dưới dạng file tạm thời
      return await viewShot.capture?.();
    } catch (error) {
      console.error("Error capturing QR code:", error);
      return null;
    }
  };

  // Hàm lưu mã QR vào thư viện ảnh
  const handleSaveToGallery = async () => {
    const uri = await captureQRCode();
    if (uri) {
      try {
        // Lưu file vào thư viện ảnh
        const asset = await MediaLibrary.createAssetAsync(uri);
        if (asset) {
          Alert.alert("Success", "Đã lưu mã QR vào thư viện của bạn.");
        }
      } catch (error) {
        console.error("Error saving QR code to gallery:", error);
        Alert.alert("Error", "Không thể lưu mã QR. Vui lòng thử lại.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quét mã để nạp tiền</Text>
      <ViewShot
        ref={viewShotRef}
        options={{ format: "png", quality: 0.9 }}
        style={{ flex: 1, padding: 16, paddingVertical: 32 }}
      >
        <QRCode value={QRValue} size={180} />
      </ViewShot>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Chia sẻ mã QR</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSaveToGallery}>
          <Text style={styles.buttonText}>Lưu vào thư viện ảnh</Text>
        </Pressable>
      </View>

      {/* Hiển thị thông tin giao dịch */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Số tài khoản: </Text>
          {transactionInfo.accountNumber}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Tên tài khoản: </Text>
          {transactionInfo.accountName}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Số tiền: </Text>
          {transactionInfo.amount.toLocaleString("vi-VN")}đ
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Mô tả: </Text>
          {transactionInfo.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginVertical: 50,
  },
  QRCodeView: {
    flexGrow: 1,
    maxHeight: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoContainer: {
    marginVertical: 16,
    marginBottom: 50,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ShowQRCodeScreen;
