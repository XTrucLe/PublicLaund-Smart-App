import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderText from "@/components/headerText";
import WalletAction from "@/components/items/walletItem";
import { useUserInfo } from "@/service/authService";
import { getTransactionHistory } from "@/service/walletService";
import { Timestamp } from "@/service/machineService";
import useStatusColor from "@/hooks/useStatus";
import formatDateFromArray from "@/hooks/useDate";
import { formatMoney } from "@/hooks/useFormatMoney(VND)";

type Transaction = {
  id: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  timestamp: Timestamp;
};

const WalletScreen = ({ navigation }: any) => {
  const information = useUserInfo();
  const [isHidden, setIsHidden] = useState(true);
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      // Gọi API lấy lịch sử giao dịch
      const response = await getTransactionHistory();
      setHistory(response);
    };
    fetchTransactionHistory();
  }, []);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleTopUp = () => {
    navigation.navigate("TopUpScreen");
  };

  const handleWithDraw = () => {
    navigation.navigate("WithDraw");
  };

  const handleHistory = () => {
    navigation.navigate("History");
  };

  const renderTransactionHistoryItem = ({ item }: { item: Transaction }) => {
    const statusColor = useStatusColor(item.status);
    const type = item.amount > 0 ? "Nạp tiền" : "Rút tiền";
    const typeColor = item.amount > 0 ? "#4CAF50" : "#F44336";
    const date = formatDateFromArray(item.timestamp);

    return (
      <View style={styles.item}>
        {/* Head View */}
        <View style={styles.headView}>
          <Text style={[styles.type, { color: typeColor }]}>{type}</Text>
          <Text style={[styles.status, statusColor]}>{item.status}</Text>
        </View>

        {/* Info View */}
        <View style={styles.infoView}>
          <Text style={styles.amount}>
            Số tiền: {item.amount.toLocaleString()} VND
          </Text>
          <Text style={styles.id}>Mã giao dịch: {item.id}</Text>
        </View>

        {/* Timestamp View */}
        <View style={styles.timestampWrapper}>
          <Text style={styles.timestamp}>{date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <HeaderText
        text={`Ví của ${information?.fullname}`}
        style={styles.headerText}
      />
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Số dư:
            {isHidden ? (
              "********"
            ) : (
              <>{formatMoney(information?.balance ?? 0)}</>
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
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderTransactionHistoryItem}
          style={styles.historyList}
        />
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
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  historyList: {
    maxHeight: 450,
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 24,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  headView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoView: {
    flex: 1,
    marginTop: 5,
    justifyContent: "space-between",
  },
  id: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    color: "#333",
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#888",
  },
  timestampWrapper: {
    marginTop: 5,
    alignItems: "flex-end",
  },
  timestamp: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
});

export default WalletScreen;
