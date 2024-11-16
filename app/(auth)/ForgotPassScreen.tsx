import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import FieldInput from "@/components/items/fieldInput";
import { validateEmail } from "@/constants/Validation";
import Toast from "react-native-toast-message";
import axios from "axios";
import CustomButton from "@/components/items/CustomButton";

const ForgotPassScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: emailError,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(process.env.EXPO_PUBLIC_API_ForgotPassword as string, { email });
      if (response.status === 200) {
        navigation.navigate("OTPVerification", { email });
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Mã OTP đã được gửi đến email của bạn",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể gửi mã OTP. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>Nhập email của bạn để nhận mã xác thực</Text>

        <FieldInput
          fieldName="Email"
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          onBlur={() => validateEmail(email)}
          style={styles.input}
        />

        <CustomButton title={loading ? "Đang gửi..." : "Gửi mã xác thực"} onPress={handleSubmit} loading={loading} />
      </View>
      <Toast />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
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
  input: {
    marginBottom: 25,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default ForgotPassScreen;
