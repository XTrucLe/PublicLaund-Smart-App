import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const BankAccountScreen = () => {
  const [bankInfo, setBankInfo] = useState({
    fullName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const handleSave = () => {
    if (!checkInfo()) return;
    console.log(bankInfo);
  };

  const checkInfo = () => {
    if (bankInfo.fullName === "") {
      alert("Họ tên không được để trống");
      return false;
    }
    if (bankInfo.bankName === "") {
      alert("Tên ngân hàng không được để trống");
      return false;
    }
    if (bankInfo.accountNumber === "") {
      alert("Số tài khoản không được để trống");
      return false;
    }
    if (bankInfo.accountHolderName === "") {
      alert("Tên chủ tài khoản không được để trống");
      return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thêm tài khoản ngân hàng</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Họ tên:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ tên"
          value={bankInfo.fullName}
          onChangeText={(value) =>
            setBankInfo({ ...bankInfo, fullName: value })
          }
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngân hàng:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên ngân hàng"
          value={bankInfo.bankName}
          onChangeText={(value) =>
            setBankInfo({ ...bankInfo, bankName: value })
          }
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Số tài khoản:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số tài khoản"
          keyboardType="numeric"
          value={bankInfo.accountNumber}
          onChangeText={(value) =>
            setBankInfo({ ...bankInfo, accountNumber: value })
          }
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Chủ tài khoản:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên chủ tài khoản"
          value={bankInfo.accountHolderName}
          onChangeText={(value) =>
            setBankInfo({ ...bankInfo, accountHolderName: value })
          }
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
      <View style={styles.notesContainer}>
        <Text style={styles.noteTitle}>Lưu ý:</Text>
        <Text style={styles.note}>- Nhập thông tin tài khoản chính xác.</Text>
        <Text style={styles.note}>
          - Tên chủ tài khoản ngân hàng phải trùng với tên người giao dịch.
        </Text>
        <Text style={styles.note}>
          - Số tài khoản ngân hàng chỉ bao gồm số.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notesContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    width: "100%",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  note: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
});

export default BankAccountScreen;
