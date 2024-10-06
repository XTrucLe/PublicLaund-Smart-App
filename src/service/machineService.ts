export interface Machine {
  machineNumber: number;
  status: "running" | "available" | "maintenance" | string;
}

export const machineList: Machine[] = [
  { machineNumber: 1, status: "running" },
  { machineNumber: 2, status: "available" },
  { machineNumber: 3, status: "running" },
  { machineNumber: 4, status: "maintenance" },
  { machineNumber: 5, status: "running" },
  { machineNumber: 6, status: "running" },
  { machineNumber: 7, status: "running" },
  { machineNumber: 8, status: "available" },
  { machineNumber: 9, status: "running" },
  { machineNumber: 10, status: "running" },
];

export const typeWashing = [
  { id: 1, name: "Quick-wash (Giặt nhanh)", duration: "30 phút", price: 10000 },
  {
    id: 2,
    name: "Ecowash (Giặt tiết kiệm)",
    duration: "60 phút",
    price: 15000,
  },
  { id: 3, name: "Bedding (Giặt chăn màn)", duration: "90 phút", price: 25000 },
  {
    id: 4,
    name: "Sports Care (Giặt đồ thể thao)",
    duration: "45 phút",
    price: 20000,
  },
];
