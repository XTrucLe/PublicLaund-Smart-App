import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderText from "@/components/headerText";
import WalletAction from "@/components/items/walletItem";
import { useUserInfo } from "@/service/authService";

const WalletScreen = ({ navigation }: any) => {
  const information = useUserInfo();
  const [isHidden, setIsHidden] = useState(true);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleTopUp = () => {
    navigation.navigate("TopUp");
  };

  const handleWithDraw = () => {
    navigation.navigate("WithDraw");
  };

  const handleHistory = () => {
    navigation.navigate("History");
  };

  return (
    <View style={styles.screen}>
      <HeaderText text={`Ví của ${information?.fullname}`} style={styles.headerText} />
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Số dư:
            {isHidden ? (
              "********"
            ) : (
              <>
                {information?.balance}
                <Text style={styles.currencyText}>đ</Text>
              </>
            )}
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
            actionText="Chuyển tiền"
            circleIconName="arrow-down-circle"
            circleIconColor="#F44336"
            onPress={handleWithDraw}
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
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  currencyText: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  iconContainer: {
    padding: 5,
  },
  containerItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "50%",
  },
  nearHistory: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
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
  linkHistoryPage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
  },
  viewAllText: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default WalletScreen;