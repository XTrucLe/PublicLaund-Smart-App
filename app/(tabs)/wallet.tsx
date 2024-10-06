import ItemComponent from "@/src/container/wallet/ItemComponent";
import { ThemedText } from "@/src/container/theme/ThemedText";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { personInfor } from "@/src/service/walletService";

const WalletScreen = () => {
  const [isHidden, setIsHidden] = useState(false);
  const profileWallet = personInfor;

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };
  //xử lý sự kiện khi nhấn vào nút nạp tiền
  const handleTopUp = () => {};
  //xử lý sự kiện khi nhấn vào nút rút tiền
  const handleWithDraw = () => {};
  //xử lý sự kiện nhấn vào nút lịch sử
  const handleHistory = () => {};
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Số dư:
            {isHidden ? (
              "********"
            ) : (
              <>
                {profileWallet.balance}
                <Text
                  style={{ textDecorationLine: "underline", marginLeft: 5 }}
                >
                  đ
                </Text>
              </>
            )}{" "}
          </Text>
          <TouchableOpacity onPress={handleHidden} style={styles.iconContainer}>
            <Ionicons
              name={isHidden ? "eye-off-outline" : "eye-outline"}
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItems}>
          <ItemComponent
            iconType="Ionicons"
            iconName="wallet-outline"
            iconColor="#30374b"
            actionText="Nạp Tiền"
            circleIconName="add-circle"
            circleIconColor="#4CAF50"
            onPress={handleTopUp}
          />
          <ItemComponent
            iconType="Ionicons"
            iconName="wallet-outline"
            iconColor="#30374b"
            actionText="Rút Tiền"
            circleIconName="arrow-down-circle"
            circleIconColor="#F44336"
            onPress={handleWithDraw}
          />
          <ItemComponent
            iconType="MaterialIcons"
            iconName="history"
            iconColor="#30374b"
            actionText="Lịch sử"
            circleIconName=""
            circleIconColor=""
            onPress={handleHistory}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200, // Chiều cao của container
    marginTop: "20%", // Cách phần top 1/5 màn hình
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  containerItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "50%",
    bottom: 0,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10, // Khoảng cách giữa text và icon
  },
  iconContainer: {
    padding: 5, // Tạo vùng nhấn dễ dàng hơn
  },
  historyItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 15,
    borderColor: "#30374b",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    margin: 2,
  },
});

export default WalletScreen;
