import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface TimeCountdownProps {
  duration: number;
  noticeTime?: number;
  onNotice?: () => void;
  onComplete?: () => void;
  start: boolean;
}

const TimeCountdown: React.FC<TimeCountdownProps> = ({
  duration,
  noticeTime = 10,
  onNotice,
  onComplete,
  start,
}) => {
  const handleNotice = (remainingTime: number) => {
    if (remainingTime === noticeTime * 60 && onNotice) {
      onNotice();
    }
    if (remainingTime === 0 && onComplete) {
      onComplete();
    }
  };

  // Sử dụng useMemo để tối ưu hóa việc tính toán thời gian còn lại
  const formatTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <View style={styles.timeColumn}>
    <View style={styles.timeItem}>
      <Text style={styles.timeText}>{minutes}</Text>
      <Text style={styles.labelText}>phút</Text>
    </View>
    <Text>:</Text>
    <View style={styles.timeItem}>
      <Text style={styles.timeText}>{seconds}</Text>
      <Text style={styles.labelText}>giây</Text>
    </View>
  </View>
    )
  };

  return (
    <View style={styles.container}>
      {start ? (
        <CountdownCircleTimer
          isPlaying={start}
          duration={duration}
          size={100}
          strokeWidth={20}
          colors={["#00E676", "#FFEB3B", "#FF4081", "#FF1744"]}
          colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
          onComplete={handleNotice}
        >
          {({ remainingTime }) => {
            const formattedTime = useMemo(() => formatTime(remainingTime), [remainingTime]);

            return (
              <View style={styles.timerContainer}>
                <Text style={styles.countdownNumber}>
                  {remainingTime == 0
                    ? start=false
                    : formattedTime}
                </Text>
              </View>
            );
          }}
        </CountdownCircleTimer>
      ) : (
        <Text style={styles.countdownNumber}>Tiến trình giặt đồ đã xong</Text>
      )}
    </View>
  );
};

export default TimeCountdown;

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
    fontSize: 36,
    fontWeight: "bold",
    padding: 20,
    borderRadius: 5,
    color: "#333",
  },
  timeColumn: {
    flexDirection: "row", // Hướng hàng
    justifyContent: "space-around", // Căn giữa các cột
  },
  timeItem: {
    alignItems: "center", // Căn giữa nội dung trong mỗi cột
  },
  timeText: {
    fontSize: 16,
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
