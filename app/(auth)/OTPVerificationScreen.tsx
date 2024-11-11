import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API_VerifyOTP } from "@env";
import CustomButton from "@/components/items/CustomButton";
import OTPInput from "@/components/items/OTPInput";

const OTPVerificationScreen = ({ route, navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  const handleVerify = async (otp: string) => {
    if (!otp || otp.length < 6) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập mã OTP hợp lệ",
      });
      return;
    }

    setLoading(true);
    try {
      const verifyResponse = await axios.post(API_VerifyOTP, {
        email,
        otp,
      });
      if (verifyResponse.data?.resetToken) {
        navigation.navigate("ResetPassword", {
          email: email,
          resetToken: verifyResponse.data.resetToken,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Xác thực OTP</Text>
        <Text style={styles.subtitle}>Nhập mã OTP đã được gửi đến email của bạn</Text>

        <OTPInput length={6} onComplete={handleVerify} />

        <CustomButton
          title={loading ? "Đang xử lý..." : "Xác thực"}
          onPress={() => {}}
          loading={loading}
          disabled={loading}
        />
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1976D2",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default OTPVerificationScreen;
