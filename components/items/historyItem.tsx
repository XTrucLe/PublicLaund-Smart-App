import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface HistoryItemProps {
  date: string;
  content: string;
  amount: number;
  type: string;
  status: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  content,
  amount,
  type,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "#4CAF50"; // Green color for success status
      case "Thất bại":
        return "#F44336"; // Red color for failed status
      case "Đang xử lý":
        return "#FFA500"; // Orange color for processing status
      default:
        return "#555"; // Gray color for other status
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.date}>{date}</Text>
        <Text style={[styles.status, { color: getStatusColor(status) }]}>
          {status}
        </Text>
      </View>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.row}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.amount}>{amount.toFixed(2)} vnđ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  status: {
    fontSize: 14,
    color: "#4CAF50", // Green color for status, you can adjust it based on status
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  type: {
    fontSize: 14,
    color: "#555",
  },
  amount: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});

export default HistoryItem;
