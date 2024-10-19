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
  TouchableOpacity,
} from "react-native";
import CurvedBackground from "@/components/CurvedBackground";
import FieldInput from "@/components/items/fieldInput";
import {
  validateEmail,
  validatePasswordForLogin,
} from "@/constants/Validation";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./AuthContext";

const LoginScreen = ({ navigation }: any) => {
  const { onLogin } = useAuth();
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
    login();
    // if (emailError || passwordError) {
    //   console.log("Please enter valid information");
    //   return;
    // }

    console.log("Email:", loginInfo.email);
    console.log("Password:", loginInfo.password);

    // Thực hiện hành động login (gửi đến API, etc.)
  };

  const login = async () => {
    const result = await onLogin!(
      loginInfo.email ?? "",
      loginInfo.password ?? ""
    );
    if (result.error) {
      console.log("Login failed");
      return;
    }
  };

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
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
          <Text style={{ margin: 4, textDecorationLine: "underline" }}>
            Hay
          </Text>
          <View style={styles.anotherLogin}>
            <TouchableOpacity style={styles.iconLogin}>
              <Ionicons name="logo-google" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconLogin}>
              <Ionicons name="logo-facebook" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconLogin}>
              <Ionicons name="logo-instagram" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  signupText: {
    color: "blue", // Thay đổi màu sắc tùy theo thiết kế
    textDecorationLine: "underline",
  },
  anotherLogin: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  iconLogin: {
    padding: 8,
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
  },
});

export default LoginScreen;
