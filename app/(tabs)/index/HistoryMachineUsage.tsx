import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WashingType } from "@/service/machineService";
import { getReservationHistory } from "@/service/ReservationService";
import { MaterialIcons } from "@expo/vector-icons";

type ReservationItem = {
  reservationId: number;
  startTime: string | null;
  endTime: string | null;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
  userId: number;
  machineId: number;
  washingType: WashingType;
};

const HistoryMachineUsage = () => {
  const [historyItems, setHistoryItems] = React.useState<ReservationItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getHistory = async () => {
      const response = await getReservationHistory();
      setHistoryItems(response);
      setLoading(false);
    };
    getHistory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "#FFA500"; // Orange
      case "SUCCESS":
        return "#28A745"; // Green
      case "FAIL":
        return "#DC3545"; // Red
      default:
        return "#6C757D"; // Gray for unknown statuses
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Lịch Sử Sử Dụng Máy</Text>
      <View style={styles.statusLegend}>
        <View style={[styles.statusBadge, { backgroundColor: "#FFA500" }]} />
        <Text style={styles.statusText}>Pending</Text>
        <View style={[styles.statusBadge, { backgroundColor: "#28A745" }]} />
        <Text style={styles.statusText}>Success</Text>
        <View style={[styles.statusBadge, { backgroundColor: "#DC3545" }]} />
        <Text style={styles.statusText}>Fail</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: ReservationItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>Mã đặt chỗ: {item.reservationId}</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
          <View
            style={[
              styles.statusCircle,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          ></View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <MaterialIcons
            name="local-laundry-service"
            size={20}
            color="#007BFF"
          />
          <Text style={styles.infoText}>Loại giặt:</Text>
          <Text style={styles.valueText}>{item.washingType.typeName}</Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="timer" size={20} color="#28A745" />
          <Text style={styles.infoText}>Thời gian mặc định:</Text>
          <Text style={styles.valueText}>
            {item.washingType.defaultDuration} phút
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="attach-money" size={20} color="#FFC107" />
          <Text style={styles.infoText}>Giá:</Text>
          <Text style={styles.valueText}>
            {item.washingType.defaultPrice.toLocaleString("vi-VN")} VND
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="play-circle-outline" size={20} color="#17A2B8" />
          <Text style={styles.infoText}>Bắt đầu:</Text>
          <Text style={styles.valueText}>
            {item.startTime || "Chưa bắt đầu"}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="stop-circle" size={20} color="#DC3545" />
          <Text style={styles.infoText}>Kết thúc:</Text>
          <Text style={styles.valueText}>
            {item.endTime || "Chưa kết thúc"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={historyItems}
          keyExtractor={(item) => item.reservationId.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  headerContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusLegend: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  statusText: {
    fontSize: 14,
    marginRight: 15,
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  infoContainer: {
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#6C757D",
    marginLeft: 10,
    flex: 1, // Đẩy giá trị sang bên phải
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#343A40",
  },
});

export default HistoryMachineUsage;
