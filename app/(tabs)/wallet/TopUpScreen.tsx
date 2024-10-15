import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, Share, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
// import RNFS from "react-native-fs";  

const TopUpScreen: React.FC = () => {
  const qrValue = "https://example.com/topup"; // Thay thế bằng URL hoặc giá trị nạp tiền thực tế
  const viewShotRef = useRef<ViewShot>(null);

  const captureQRCode = async () => {
    const viewShot = viewShotRef.current;
  
    if (!viewShot) {
      console.warn('ViewShot reference is undefined');
      return null;
    }
  
    try {
      // Chụp ảnh màn hình của QRCode
      return await viewShot.capture?.();
    } catch (error) {
      console.error('Error capturing QR code:', error);
      return null;
    }
  };

  const handleShare = async () => {
    const uri = await captureQRCode();
    if (uri) {
      await Share.share({
        title: 'Share QR Code',
        url: uri,
        message: 'Here is your QR code for top-up!',
      });
    }
  };
  
//   const handleDownload = async () => {
//     const uri = await captureQRCode();
//     if (uri) {
//       try {
//         // Đặt tên file và đường dẫn
//         const downloadPath = `${RNFS.DocumentDirectoryPath}/QRCode.png`;
  
//         // Sao chép tệp từ URI đến đường dẫn đích
//         await RNFS.copyFile(uri, downloadPath);
        
//         Alert.alert("Success", "QR Code has been downloaded to your device.");
//       } catch (error) {
//         console.error('Error downloading QR code:', error);
//         Alert.alert("Error", "Failed to download QR code.");
//       }
//     }
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Up Your Wallet</Text>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
        <QRCode value={qrValue} size={200} />
      </ViewShot>
      <Pressable onPress={handleShare} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share QR Code</Text>
      </Pressable>
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
    marginBottom: 20,
  },
  shareButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF", // Màu xanh
    borderRadius: 5,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TopUpScreen;
