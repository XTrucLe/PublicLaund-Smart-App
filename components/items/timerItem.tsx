import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CoundownProps {
  coundownTime: number;
  tagetTime?: number;
  onTick?: () => void; // Callback khi đến một mốc thời gian cụ thể
  onTimeUp?: () => void; // Callback khi thời gian đếm ngược về 0
}

export const CoundownTimer: React.FC<CoundownProps> = ({
  coundownTime,
  tagetTime,
  onTick,
  onTimeUp,
}) => {
  const [remainingTime, setRemainingTime] = useState(coundownTime * 60);
  const [isCoundown, setIsCoundown] = useState(false);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes} : ${formattedSeconds}`;
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isCoundown && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (tagetTime != undefined && remainingTime === tagetTime * 60) {
      onTick?.();
    }

    if (remainingTime <= 0 && intervalId) {
      clearInterval(intervalId);
      onTimeUp?.();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isCoundown, remainingTime, onTimeUp]);

  const startCountdown = () => {
    setIsCoundown(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textCounters}>{formatTime(remainingTime)}</Text>
      <View>
        {!isCoundown && (
          <Pressable style={styles.startButton} onPress={startCountdown}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textCounters: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  
});
