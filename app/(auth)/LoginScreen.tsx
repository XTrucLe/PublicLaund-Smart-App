import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import CurvedBackground from "@/components/CurvedBackground";
import FieldInput from "@/components/items/fieldInput";
import {
  validateEmail,
  validatePasswordForLogin,
} from "@/constants/Validation";

const LoginScreen = ({ navigation }: any) => {
  const [loginInfo, setLoginInfo] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });
  const handleLogin = () => {
    const emailError = validateEmail(loginInfo.email ?? "");
    const passwordError = validatePasswordForLogin(loginInfo.password ?? "");

    if (emailError || passwordError) {
      return;
    }

    console.log("Email:", loginInfo.email);
    console.log("Password:", loginInfo.password);
    // Thực hiện hành động login (gửi đến API, etc.)
  };

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }}>
        <CurvedBackground>
          <Text style={styles.title}>Đăng nhập</Text>
        </CurvedBackground>
        <View style={styles.main}>
          <FieldInput
            fieldName="Email"
            value={loginInfo.email ?? ""}
            onChangeText={(value) =>
              setLoginInfo({ ...loginInfo, email: value })
            }
            onBlur={() => validateEmail(loginInfo.email ?? "")}
          />
          <FieldInput
            fieldName="Mật khẩu"
            value={loginInfo.password ?? ""}
            onChangeText={(value) =>
              setLoginInfo((prev) => ({ ...prev, password: value }))
            }
            onBlur={() => validatePasswordForLogin(loginInfo.password ?? "")}
            sercurity={true}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.footer}>
          <Text>
            Bạn chưa có tài khoản?{" "}
            <Pressable onPress={handleSignup}>
              <Text style={styles.signupText}>Đăng ký tài khoản</Text>
            </Pressable>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  main: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  signupText: {
    color: "blue", // Thay đổi màu sắc tùy theo thiết kế
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
