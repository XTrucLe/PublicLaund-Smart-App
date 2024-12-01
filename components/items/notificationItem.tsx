import formatDateFromArray from "@/hooks/useDate";
import { Timestamp } from "@/service/machineService";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ItemProps = {
  id: number;
  message: string;
  userId: number;
  createdAt: Timestamp; // Thời gian dạng chuỗi ISO (e.g., "2024-11-24T10:30:00")
  isRead: boolean;
};

const NotificationItem = ({
  id,
  message,
  userId,
  createdAt,
  isRead,
}: ItemProps) => {
  const handOnclick = () => {
    console.log("clicked");
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isRead ? "#fff" : "#f5f5f5" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.dateText}>{formatDateFromArray(createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Lớp phủ bán trong suốt
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Đảm bảo lớp phủ theo viền bo tròn
    zIndex: 1, // Hiển thị lớp phủ trên nội dung
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    marginTop: 5,
  },
  messageText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
});

export default NotificationItem;
