import React from "react";
import { StyleSheet } from "react-native";

type Status = "PENDING" | "SUCCESS" | "FAILED";

const useStatusColor = (status: Status) => {
  switch (status) {
    case "PENDING":
      return styles.pending;
    case "SUCCESS":
      return styles.success;
    case "FAILED":
      return styles.failed;
    default:
      return styles.default;
  }
};

const styles = StyleSheet.create({
  pending: {
    color: "#FFA500", // Orange
  },
  success: {
    color: "#4CAF50", // Green
  },
  failed: {
    color: "#FF5252", // Red
  },
  default: {
    color: "#000", // Black
  },
});

export default useStatusColor;
