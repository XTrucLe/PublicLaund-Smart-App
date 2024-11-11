import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import FieldInput from "@/components/items/fieldInput";
import { validatePassword } from "@/constants/Validation";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API_ResetPassword } from "@env";
import CustomButton from "@/components/items/CustomButton";

const ResetPasswordScreen = ({ route, navigation }: any) => {
  const { email, resetToken } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: passwordError,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mật khẩu nhập lại không khớp",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_ResetPassword, {
        email,
        newPassword,
        resetToken,
      });

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Mật khẩu đã được cập nhật",
        });
        navigation.navigate("Login");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể cập nhật mật khẩu. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đặt lại mật khẩu</Text>
        <Text style={styles.subtitle}>Vui lòng nhập mật khẩu mới của bạn</Text>

        <FieldInput
          fieldName="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChangeText={setNewPassword}
          onBlur={() => validatePassword(newPassword)}
          sercurity={true}
          style={styles.input}
        />

        <FieldInput
          fieldName="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu mới"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          sercurity={true}
          style={styles.input}
        />

        <CustomButton
          title={loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
          onPress={handleSubmit}
          loading={loading}
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1976D2",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default ResetPasswordScreen;
