import { Timestamp } from "@/service/machineService";

const formatDateFromArray = (dateArray: Timestamp) => {
  const [year, month, day, hour, minute, second] = dateArray;

  // Tạo đối tượng Date từ các giá trị
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Định dạng ngày tháng
  return date.toLocaleString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
export default formatDateFromArray;
