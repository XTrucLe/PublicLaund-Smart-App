import { useUserInfo } from "@/service/authService";
import { getMachineReversed } from "@/service/machineService";
import { useState, useEffect } from "react";

const CheckMachineReserved = async () => {
  const machines = await getMachineReversed();
  return machines ? true : false;
};

const CheckBeforeWashing = () => {
  const [message, setMessage] = useState(""); // Message state
  const [isHasBalance, setIsHasBalance] = useState(false);
  const userInfo = useUserInfo(); // Giả sử useUserInfo trả về đối tượng người dùng.

  useEffect(() => {
    const balance = Number(userInfo?.balance);
    setIsHasBalance(balance > 0);
  }, [userInfo]); // Chạy lại khi userInfo thay đổi

  useEffect(() => {
    const checkConditions = async () => {
      if (!isHasBalance) {
        setMessage("Tài khoản của bạn không đủ tiền");
      } else {
        const isReserved = await CheckMachineReserved();
        if (isReserved) {
          setMessage(
            "Bạn phải bắt đầu sử dụng máy đã được đặt trước khi đặt máy mới"
          );
        }
      }
    };

    checkConditions();
  }, [isHasBalance]); // Chạy lại khi isHasBalance thay đổi

  return message;
};

export { CheckBeforeWashing };
