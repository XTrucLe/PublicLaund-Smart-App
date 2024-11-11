import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import useLaundry from "@/hooks/useStartLaundry";
import { MachineUsage } from "@/service/machineService";
import useCountdown from "@/hooks/useCowndown";
import TimeCountdown from './../clock/TimeCoundown';

const MachineUsageView: React.FC<MachineUsage> = ({
  id,
  name,
  status,
  capacity,
  model,
  locationName,
  startTime,
  endTime,
}) => {
  const { loading } = useLaundry();
  console.log("start time: ",startTime, "end time: ",endTime, typeof startTime, typeof endTime);
  
  let startTimeStamp = Date.UTC(startTime[0], startTime[1]-1, startTime[2], startTime[3], startTime[4], startTime[5]);
  let endTimeStamp = Date.UTC(endTime[0], endTime[1]-1, endTime[2], endTime[3], endTime[4], endTime[5]);
  console.log("start time: ",startTimeStamp, "end time: ",endTimeStamp);
  

  var { timeLeft: countdownTime, timeTotal, isRunning } = useCountdown(startTimeStamp, endTimeStamp); // Tính toán thời gian còn lại



  console.log("start time: ",countdownTime, "end time: ",timeTotal, isRunning);
  
  const showAlert = (title: string, message?: string) => {
    Alert.alert(title, message);
  };

  const handleComplete = () => {
    showAlert("Thông báo", `Máy giặt số ${id} đã hoàn thành.`);
  };

  const handleNotice = () => {
    showAlert("Thông báo", `Máy giặt số ${id} sắp hoàn thành.`);
  };



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
            { backgroundColor:  "green" },
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
          {status === "reserved" && (
            <Text style={styles.timerText}>
              Thời gian giặt: {countdownTime} phút
            </Text>
          )}
        </View>

        
          <View style={styles.timerContainer}>
            <TimeCountdown
              duration={timeTotal}
              onComplete={handleComplete}
              initialRemainingTime={countdownTime}
              start={isRunning}
            />
          </View>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f7f7f7",
    marginBottom: 12,
    overflow: "hidden",
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#b3e5fc",
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
  timerText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  timerContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 16,
    width: 160,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  startButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#4caf50",
    color: "#fff",
    textAlign: "center",
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  overlay: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền tối với độ mờ
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MachineUsageView;
