import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface TimeCountdownProps {
  duration: number;
  noticeTime?: number;
  onNotice?: () => void;
}

const TimeCountdown: React.FC<TimeCountdownProps> = ({
  duration,
  noticeTime = 1, //mặc định 10 phút
  onNotice,
}) => {
  const [starting, setstarting] = useState(false); // trạng thái chơi

  // Hàm chuyển đổi giây thành định dạng mm:ss
  const formatTime = (remainingTime: number) => {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };

  const handleStart = () => {
    setstarting(true); // Bắt đầu đếm ngược
  };

  const handleNotice = (remainingTime: number) => {
    if (remainingTime === noticeTime * 60) {
      onNotice && onNotice(); // Thông báo khi còn thời gian bằng noticeTime
    }
    if (remainingTime === 0) {
      setstarting(false); // Kết thúc đếm ngược
    }
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      {!starting && ( // Hiển thị nút Start khi chưa bắt đầu
        <Pressable onPress={handleStart}>
          <Text style={styles.startButton}>Start</Text>
        </Pressable>
      )}

      {starting && ( // Hiển thị đồng hồ đếm ngược khi đã bắt đầu
        <CountdownCircleTimer
          isPlaying={true}
          duration={duration}
          strokeWidth={20}
          colors={["#00E676", "#FFEB3B", "#FF4081", "#FF1744"]}
          colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
          onComplete={handleNotice}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              return (
                <Text style={styles.text}>Tiến trình giặt đồ đã xong</Text>
              );
            } // Hiển thị thông báo khi hoàn thành
            return <Text style={styles.coundownNumber}>
              {formatTime(remainingTime)}
            </Text>;
          }}
        </CountdownCircleTimer>
      )}
    </View>
  );
};

export default TimeCountdown;

const styles = StyleSheet.create({
  startButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "blue",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  coundownNumber: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    paddingVertical: "auto",
    borderRadius: 5,
    color: "red",
  },
});
