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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          #{id} - User: {userId} - {isRead ? "Đã đọc" : "Chưa đọc"}
        </Text>
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
