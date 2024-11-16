import { Timestamp } from "@/service/machineService";
import { useEffect, useState } from "react";

const useCountdown = (startTime: number, endTime: number) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTotal, setTimeTotal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let date = new Date();
    var now = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      // date.getMilliseconds()
    );
    console.log("now: ", date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),);
    
    
    console.log("now: ", now, "startTime: ", startTime, "endTime: ", endTime);

    const total = Math.floor((endTime - startTime) / 1000);
    setTimeTotal(total);

    // Kiểm tra thời gian hiện tại so với startTime và endTime
    if (now > startTime && now < endTime) {
      setIsRunning(true);
      const secondsLeft = Math.floor((endTime - now) / 1000); // Tính toán thời gian còn lại bằng giây
      console.log("seconds left: ", secondsLeft);

      setTimeLeft(secondsLeft);
    } else {
      setIsRunning(false);
      setTimeLeft(0); // Nếu không trong khoảng thời gian, đặt lại
    }
  }, [startTime, endTime]);

  // Hàm bắt đầu và dừng countdown
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  return { timeLeft, timeTotal, isRunning, start, stop };
};

export default useCountdown;
