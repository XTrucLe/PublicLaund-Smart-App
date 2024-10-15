import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { personInfor } from "@/service/walletService";
import HeaderText from "@/components/headerText";
import WalletAction from "@/components/items/walletItem";
import { NavigationProps } from "@/components/navigation";

type WalletScreenProps = {
  navigation: NavigationProps<"WalletScreen">;
};

const WalletScreen: React.FC<WalletScreenProps> = ({navigation}) => {
  const [isHidden, setIsHidden] = useState(false);
  const profileWallet = personInfor;
  

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };
  //xử lý sự kiện khi nhấn vào nút nạp tiền
  const handleTopUp = () => {
    navigation.navigate("TopUpScreen");
  };
  //xử lý sự kiện khi nhấn vào nút rút tiền
  const handleWithDraw = () => {};
  //xử lý sự kiện khi nhấn vào nút quét mã QR
  const handleScanner = () => {
    // router.navigate("/QRScanner");
  };
  //xử lý sự kiện nhấn vào nút lịch sử
  const handleHistory = () => {
    // router.navigate("/history");
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderText
        text="Ví của bạn"
        style={{ backgroundColor: "transparent" }}
      />
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
          <WalletAction
            iconType="Ionicons"
            iconName="wallet-outline"
            iconColor="#30374b"
            actionText="Nạp Tiền"
            circleIconName="add-circle"
            circleIconColor="#4CAF50"
            onPress={handleTopUp}
          />
          <WalletAction
            iconType="Ionicons"
            iconName="wallet-outline"
            iconColor="#30374b"
            actionText="Rút Tiền"
            circleIconName="arrow-down-circle"
            circleIconColor="#F44336"
            onPress={handleWithDraw}
          />
          <WalletAction
            iconType="MaterialIcons"
            iconName="qr-code-scanner"
            iconColor="#30374b"
            actionText="Quét mã"
            onPress={handleScanner}
          />
          <WalletAction
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

      <View style={styles.nearHistory}>
        <View style={styles.linkHistoryPage}>
          <HeaderText text="Giao dịch gần đây:" />
          <TouchableOpacity onPress={handleHistory}>
            <Text style={{ textDecorationLine: "underline", color: "blue" }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200, // Chiều cao của container
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
  linkHistoryPage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop:0,
  },
  nearHistory: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default WalletScreen;
