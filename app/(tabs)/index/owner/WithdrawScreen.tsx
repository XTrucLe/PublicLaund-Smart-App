import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserInfo } from "@/service/authService";
import { formatMoney } from "@/hooks/useFormatMoney(VND)";

const OwnerWithdrawScreen = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0 đ");
  const userInfo = useUserInfo();

  const alert = (message: string) => {
    Alert.alert("Thông báo", message);
  };

  const handleWithdraw = async () => {
    let today = new Date().getDate();
    if (withdrawAmount === "0 đ") {
      alert("Vui lòng nhập số tiền cần rút");
      return;
    }
    if (!checkConditionWithdraw()) {
      alert("Số tiền rút ít nhất là 10.000.000");
      return;
    }
    if (balance < 10000000) {
      alert("Số dư không đủ để rút");
      return;
    }
    if (today < 10 || today > 15) {
      alert("Chỉ được rút tiền từ ngày 10 đến ngày 15 hàng tháng");
      return;
    }
    console.log("Withdraw amount: ", withdrawAmount);
  };

  const checkConditionWithdraw = () => {
    let amount = withdrawAmount.replace(/[^0-9]/g, "");
    if (parseInt(amount) < 10000000) {
      return false;
    }
    return true;
  };

  const handleAmountChange = (amount: string) => {
    // Remove non-numeric characters
    let numericAmount = amount.replace(/[^0-9]/g, "");
    numericAmount = numericAmount.replace(/^0+/, "");
    // Format the number with commas
    const formattedAmount = numericAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (numericAmount === "") {
      setWithdrawAmount("0 đ");
      return;
    }

    setWithdrawAmount(formattedAmount + " đ");
  };
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.balanceText}>Số dư:</Text>
          <Text style={styles.balanceNumbers}> {formatMoney(balance)}</Text>
        </View>
        <Button title="Lịch sử" />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên người rút:</Text>
          <TextInput
            style={styles.input}
            value={"Le Dinh Thinh"}
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số tài khoản:</Text>
          <TextInput
            style={styles.input}
            value={"123456789"}
            editable={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số tiền cần rút:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số tiền cần rút"
            keyboardType="numeric"
            value={withdrawAmount}
            onChangeText={handleAmountChange}
            selection={{
              start: withdrawAmount.length - 2,
              end: withdrawAmount.length - 2,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={handleWithdraw}
        >
          <Text style={styles.withdrawButtonText}>Rút tiền</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.noteTitle}>Yêu cầu và lưu ý:</Text>
        <Text style={styles.note}>
          - Một tháng được rút vào ngày 10 đến ngày 15.
        </Text>
        <Text style={styles.note}>- Số tiền rút ít nhất là 10.000.000.</Text>
        <Text style={styles.note}>- Thời gian xử lý yêu cầu là 72h.</Text>
        <Text style={styles.note}>- Mọi thắc mắc xin liên hệ ...</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },
  balanceText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  balanceNumbers: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputGroup: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    marginTop: 16,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  withdrawButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 16,
  },
  withdrawButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notesContainer: {
    marginTop: 32,
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

export default OwnerWithdrawScreen;
