import { NavigationProps } from "@/components/navigation";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TopUpScreen: React.FC = () => {
  const [amount, setAmount] = useState("");
  const navigation = useNavigation<NavigationProps<"TopUpScreen">>();

  const predefinedAmounts = [10000, 20000, 50000, 100000];

  // Hàm định dạng số tiền
  const formatAmount = (value: string) => {
    // Loại bỏ ký tự không phải số
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    // Định dạng số với dấu chấm phân cách hàng nghìn
    return `${parseInt(numericValue, 10).toLocaleString("vi-VN")}đ`;
  };

  const handleTopUp = () => {
    const numAmount = parseInt(amount.replace(/\D/g, ""), 10);

    // Kiểm tra nếu số tiền không hợp lệ
    if (isNaN(numAmount)) {
      Alert.alert("Lỗi", "Vui lòng nhập một số tiền hợp lệ.");
      return;
    }

    // Kiểm tra nếu số tiền nhỏ hơn 10,000
    if (numAmount < 10000) {
      Alert.alert("Lỗi", "Số tiền nạp phải lớn hơn hoặc bằng 10,000đ.");
      return;
    }

    // Kiểm tra nếu số tiền lớn hơn 5,000,000
    if (numAmount > 5000000) {
      Alert.alert("Lỗi", "Số tiền nạp phải nhỏ hơn hoặc bằng 5,000,000đ.");
      return;
    }

    navigation.navigate("ShowQRCodeScreen", { amount: numAmount });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nạp tiền</Text>

      <ScrollView style={styles.actionContainer}>
        <Text style={styles.label}>Chọn số tiền:</Text>
        <View style={styles.buttonGroup}>
          {predefinedAmounts.map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.amountButton}
              onPress={() => setAmount(value.toString())}
            >
              <Text style={styles.buttonText}>
                {value.toLocaleString()} VNĐ
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Hoặc nhập số tiền:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          selection={{ start: amount.length - 1, end: amount.length - 1 }}
          onChangeText={(text) => setAmount(formatAmount(text))}
          placeholder="Nhập số tiền tối thiểu 10,000đ"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleTopUp}>
          <Text style={styles.submitText}>Nạp tiền</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  actionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amountButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "48%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TopUpScreen;
