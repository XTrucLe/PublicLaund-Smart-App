import { Timestamp } from "@/service/machineService";

const formatDateFromArray = (dateArray: Timestamp): string => {
  const [year, month, day, hour, minute, second] = dateArray;

  // Tạo đối tượng Date và định dạng ngày tháng
  return new Date(year, month - 1, day, hour, minute, second).toLocaleString(
    "vi-VN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
};
const formatDateFromStamp = (stamp: string) => {
  const date = new Date(stamp);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
export default formatDateFromArray;
