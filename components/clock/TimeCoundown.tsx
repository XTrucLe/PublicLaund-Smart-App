import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface TimeCountdownProps {
  duration: number;
  initialRemainingTime?: number;
  onComplete?: () => void;
  start: boolean;
} 

const TimeCountdown: React.FC<TimeCountdownProps> = ({
  duration,
  initialRemainingTime=0,
  onComplete,
  start,
}) => {
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

  const handleNotice = () => {
    let message = "Đã hoàn thành";
    if (onComplete) {
      onComplete();
    }
    return { shouldRepeat: false, delay: 0 };
  }
  const formatTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <View style={styles.timeColumn}>
        <View style={styles.timeItem}>
          <Text style={styles.timeText}>{minutes}</Text>
          <Text style={styles.labelText}>phút</Text>
        </View>
        <Text style={{fontSize:9, paddingBottom:10}}>:</Text>
        <View style={styles.timeItem}>
          <Text style={styles.timeText}>{seconds}</Text>
          <Text style={styles.labelText}>giây</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {start ? (
        <CountdownCircleTimer
          isPlaying={start}
          duration={duration}
          initialRemainingTime={initialRemainingTime}//đếm ngược từ thời gian còn lại
          size={100}
          strokeWidth={20}
          colors={["#00E676", "#FFEB3B", "#FF4081", "#FF1744"]}
          colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
          onComplete={handleNotice}
          onUpdate={(time) => setRemainingTime(time)}//cập nhật thời gian còn lại cho progress bar
        >
          {({ remainingTime }) => (
            <View style={styles.timerContainer}>
              <Text style={styles.countdownNumber}>
                {remainingTime == 0 ? "Xong" : formatTime(remainingTime)}
              </Text>
            </View>
          )}
        </CountdownCircleTimer>
      ) : (
        <Text style={styles.countdownNumber}>Tiến trình giặt đồ đã xong</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    
  },
  timerContainer: {
    alignItems: "center",
  },
  countdownNumber: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 20,
    borderRadius: 5,
    color: "#333",
  },
  timeColumn: {
    flex:1,
    flexDirection: "row", // Hướng hàng
    justifyContent: "space-around", // Căn giữa các cột
    alignItems:"center"
  },
  timeItem: {
    alignItems: "center", // Căn giữa nội dung trong mỗi cột
  },
  timeText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333",
  },
  labelText: {
    fontSize: 9,
    color: "#666",
  },
  timerLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});
export default TimeCountdown;
