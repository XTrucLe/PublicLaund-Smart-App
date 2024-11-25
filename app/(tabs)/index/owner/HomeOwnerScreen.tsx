import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, Card } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AvailableMachineView from "@/components/machine/AvailableMachineView";
import { getMachineOwner, MachineData } from "@/service/machineService";

const HomeOwnerScreen = () => {
  const [ownMachine, setOwnMachine] = React.useState<MachineData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachineOwner();
      setOwnMachine(data);
    };
    fetchData;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tổng quan hệ thống</Text>

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Số lượng máy giặt</Text>
          <View style={styles.statusContainer}>
            <StatusItem icon="water" color="blue" text="Đang chạy: 5" />
            <StatusItem
              icon="checkmark-circle"
              color="green"
              text="Khả dụng: 10"
            />
            <StatusItem icon="warning" color="yellow" text="Bảo trì: 2" />
          </View>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Tổng doanh thu</Text>
            <View style={styles.revenueContainer}>
              <FontAwesome name="money" size={24} color="green" />
              <Text style={styles.revenueText}>100,000,000 VND</Text>
            </View>
            <Text style={styles.revenueSubText}>
              Doanh thu tích lũy (tháng)
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Lượt sử dụng gần đây</Text>
            <View style={styles.usageContainer}>
              <Ionicons name="stats-chart" size={24} color="purple" />
              <Text style={styles.usageText}>50 lượt (tuần)</Text>
            </View>
          </Card.Content>
        </Card>
        
        {ownMachine&&(
          <View style={styles.OwnedMachines}>
          <Text>Máy giặt sỡ hữu:</Text>
          <FlatList
            data={ownMachine}
            renderItem={(items) => <AvailableMachineView {...items.item} />}
          />
        </View>
        )}
      </View>
      {/* <ActivityIndicator animating/> */}
    </ScrollView>
  );
};

const StatusItem = ({ icon, color, text }: any) => (
  <View style={styles.statusItem}>
    <Ionicons name={icon} size={24} color={color} />
    <Text>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusItem: {
    minHeight: 90,
    maxHeight: 120,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    width: "30%",
  },
  revenueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  revenueText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  revenueSubText: {
    marginTop: 4,
    color: "gray",
  },
  usageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usageText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  OwnedMachines: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default HomeOwnerScreen;
