import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface TimeCountdownProps {
  duration: number;
  noticeTime?: number;
  onNotice?: () => void;
  onComplete?: () => void; // Thêm prop onComplete
  start: boolean; // Trạng thái start truyền từ prop
}

const TimeCountdown: React.FC<TimeCountdownProps> = ({
  duration,
  noticeTime = 10,
  onNotice,
  onComplete,
  start,
}) => {
  const formatTime = (remainingTime: number) => {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleNotice = (remainingTime: number) => {
    if (remainingTime === noticeTime * 60 && onNotice) {
      onNotice(); // Gọi hàm onNotice nếu thời gian còn lại bằng mốc noticeTime
    }
    if (remainingTime === 0 && onComplete) {
      onComplete(); // Gọi hàm onComplete khi hết thời gian
    }
  };

  return (
    <View style={styles.container}>
      {start ? ( // Nếu đang đếm ngược thì hiện đồng hồ đếm
        <CountdownCircleTimer
          isPlaying={start}
          duration={duration}
          size={100}
          strokeWidth={20}
          colors={["#00E676", "#FFEB3B", "#FF4081", "#FF1744"]}
          colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
          onComplete={handleNotice}
        >
          {({ remainingTime }) => (
            <Text style={styles.countdownNumber}>
              {remainingTime === 0
                ? "Tiến trình giặt đồ đã xong"
                : formatTime(remainingTime)}
            </Text>
          )}
        </CountdownCircleTimer>
      ):null}
    </View>
  );
};

export default TimeCountdown;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  startButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    marginVertical: 5,
  },
  countdownNumber: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
