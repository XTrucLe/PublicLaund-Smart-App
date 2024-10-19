import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import FieldInput from "@/components/items/fieldInput";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhone,
} from "@/constants/Validation";

type RegisterScreenProps = {
  fullname: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const RegisterScreen = () => {
  const [information, setInformation] = React.useState<RegisterScreenProps>({
    fullname: null,
    username: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });

  const handleRegister = () => {
    for (const [key, value] of Object.entries(information)) {
      if (!value) {
        console.log(`Please enter ${key}`);
        return;
      }
    }
    if (information.password !== information.confirmPassword) {
      console.log("Mật khẩu nhập lại không khớp");
      return;
    }
    console.log("Register", information);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
       keyboardVerticalOffset={ 80}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Text style={styles.headerText}>Đăng ký tài khoản</Text>
        <View style={{ flex: 1, padding: 16 }}>
          <FieldInput
            fieldName="Tên đầy đủ"
            value={information.fullname ?? ""}
            onChangeText={(value) => {
              setInformation({ ...information, fullname: value });
            }}
            onBlur={() => validateFullName(information.fullname ?? "")}
          />
          <FieldInput
            fieldName="Tên đăng nhập"
            value={information.username ?? ""}
            onChangeText={(value) => {
              setInformation({ ...information, username: value });
            }}
          />
          <FieldInput
            fieldName="Email"
            value={information.email ?? ""}
            onChangeText={(value) => {
              setInformation({ ...information, email: value });
            }}
            onBlur={() => validateEmail(information.email ?? "")}
          />
          <FieldInput
            fieldName="Số điện thoại"
            value={information.phone ?? ""}
            onChangeText={(value) => {
              setInformation({ ...information, phone: value });
            }}
            onBlur={() => validatePhone(information.phone ?? "")}
          />
          <FieldInput
            fieldName="Mật khẩu"
            value={information.password ?? ""}
            onChangeText={(value) => {
              setInformation({ ...information, password: value });
            }}
            onBlur={() => validatePassword(information.password ?? "")}
          />
          <FieldInput
            fieldName="Xác nhận mật khẩu"
            value={information.confirmPassword ?? ""}
            onChangeText={(value) => {
              setInformation({ ...information, confirmPassword: value });
            }}
          />
        </View>
        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  registerButton: {
    marginHorizontal: "45%",
    width: "50%",
    backgroundColor: "blue",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterScreen;
