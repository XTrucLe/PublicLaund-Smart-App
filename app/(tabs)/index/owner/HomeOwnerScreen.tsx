import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Card, Menu } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AvailableMachineView from "@/components/machine/AvailableMachineView";
import { getMachineOwner, MachineData } from "@/service/machineService";
import { getNumberUsingByMonth, getTotalRevenue } from "@/service/OwnerService";
import { formatMoney } from "@/hooks/useFormatMoney(VND)";
import HeaderText from "@/components/headerText";
import MachineOwnerItem from "@/components/items/machineOwnerItem";

const date = new Date();

const HomeOwnerScreen = () => {
  const [ownMachine, setOwnMachine] = useState<MachineData[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [revenueState, setRevenueState] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    isYearly: false,
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [numberUsing, setNumberUsing] = useState(0);
  const [status, setStatus] = useState({
    running: 0,
    available: 0,
    maintenance: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachineOwner();
      setOwnMachine(data);

      // Khởi tạo các biến tạm thời cho từng trạng thái
      let runningCount = 0;
      let availableCount = 0;
      let maintenanceCount = 0;

      // Lặp qua tất cả các máy
      data.forEach((machine: any) => {
        const status = machine.status.toLowerCase();
        if (status === "running" || status === "reserved") {
          runningCount += 1;
        } else if (status === "available") {
          availableCount += 1;
        } else {
          maintenanceCount += 1;
        }
      });

      // Cập nhật status sau khi lặp qua tất cả dữ liệu
      setStatus({
        running: runningCount,
        available: availableCount,
        maintenance: maintenanceCount,
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    // call api
    const fetchData = async () => {
      const data = await getTotalRevenue(
        revenueState.isYearly ? "year" : "month",
        revenueState.month,
        revenueState.year
      );
      data ? setTotalRevenue(data) : setTotalRevenue(0);
    };
    fetchData();
  }, [revenueState]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNumberUsingByMonth(revenueState.month);
      data ? setNumberUsing(data) : setNumberUsing(0);
    };
    fetchData();
  }, []);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const renderMenuItem = () => {
    const curentMonth = date.getMonth() + 1;

    const months = Array.from({ length: curentMonth }, (_, i) => i + 1);
    return months.map((month) => (
      <Menu.Item
        key={month}
        onPress={() => {
          setRevenueState({ ...revenueState, month });
          toggleMenu();
        }}
        title={month.toString()}
      />
    ));
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tổng quan hệ thống</Text>

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Số lượng máy giặt</Text>
          <View style={styles.statusContainer}>
            <StatusItem
              icon="water"
              color="blue"
              text={`Đang chạy: ${status.running}`}
            />
            <StatusItem
              icon="checkmark-circle"
              color="green"
              text={`Sẵn sàng: ${status.available}`}
            />
            <StatusItem
              icon="warning"
              color="yellow"
              text={`Bảo trì: ${status.maintenance}`}
            />
          </View>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.datePickerContainer}>
              <Menu
                visible={menuVisible}
                onDismiss={toggleMenu}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={toggleMenu}
                    style={{ width: "100%", height: "100%", zIndex: 1 }}
                  >
                    {revenueState.isYearly
                      ? revenueState.year
                      : `${revenueState.month}/${revenueState.year}`}
                  </Button>
                }
                style={{ maxHeight: 250, marginTop: 80, borderRadius: 8 }}
              >
                <ScrollView>
                  <Menu.Item
                    onPress={() => {
                      setRevenueState({
                        ...revenueState,
                        isYearly: true,
                      });
                      toggleMenu();
                    }}
                    title="Năm nay"
                  />
                  {renderMenuItem()}
                </ScrollView>
              </Menu>
            </View>
            <Text style={styles.cardTitle}>Tổng doanh thu</Text>

            <View style={styles.revenueContainer}>
              <FontAwesome name="money" size={24} color="green" />
              <Text style={styles.revenueText}>
                {formatMoney(totalRevenue)}
              </Text>
            </View>

            <Text style={styles.revenueSubText}>
              Doanh thu tích lũy ({revenueState.month}, {revenueState.year})
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>
              Lượt sử dụng{" "}
              {revenueState.month === date.getMonth() + 1
                ? "gần đây."
                : `tháng ${revenueState.month}`}
            </Text>
            <View style={styles.usageContainer}>
              <Ionicons name="stats-chart" size={24} color="purple" />
              <Text style={styles.usageText}>{numberUsing} lượt</Text>
            </View>
          </Card.Content>
        </Card>

        {ownMachine && (
          <FlatList
            data={ownMachine}
            renderItem={(items) => (
              <MachineOwnerItem machineData={items.item} />
            )}
            ListHeaderComponent={
              <HeaderText text="Máy giặt của bạn" style={{ marginLeft: 10 }} />
            }
            keyExtractor={(item) => item.id.toString()}
            style={styles.OwnedMachines}
            nestedScrollEnabled
          />
        )}
      </View>
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
    fontSize: 14,
    color: "gray",
  },
  datePickerContainer: {
    position: "absolute",
    marginTop: 8,
    right: 0,
    width: 120,
    padding: -8,
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
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 8,
  },
});

export default HomeOwnerScreen;
