import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MachineData } from "@/service/machineService";
import useLaundry from "@/hooks/useStartLaundry";

type Props = MachineData & {
  startLaundry?: (id: number) => void;
  cancelLaundry?: (id: number) => void;
  loading?: boolean;
};

const ReservedMachineView: React.FC<Props> = ({
  id,
  name,
  capacity,
  model,
  status,
  locationName,
}) => {
  const { startLaundry, cancelLaundry, loading } = useLaundry();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.machineText} numberOfLines={1}>
          Máy giặt số #{id}
        </Text>
        <View
          style={[
            styles.statusCircle,
            { backgroundColor: status === "reserved" ? "green" : "red" },
          ]}
        />
      </View>

      {/* Content */}
      <View style={styles.mainContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Tên máy: {name}</Text>
          <Text style={styles.detailsText}>Dung tích: {capacity} kg</Text>
          <Text style={styles.detailsText}>Model: {model}</Text>
          <Text style={styles.detailsText}>Vị trí: {locationName}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={() => startLaundry(id)} disabled={loading}>
            <Text style={styles.startButton}>Bắt đầu</Text>
          </Pressable>
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color="#fff"
            />
          )}
          <Pressable onPress={() => cancelLaundry(id)} disabled={loading}>
            <Text style={[styles.startButton, { backgroundColor: "red" }]}>
              Hủy
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f7f7f7",
    marginBottom: 12,
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  timerText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 10,
  },
  startButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#4caf50",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#b3e5fc",
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  mainContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
  },
  loadingIndicator: {
    marginLeft: 10,
  },
});

export default ReservedMachineView;
