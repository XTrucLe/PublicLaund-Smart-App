import axios from 'axios';
import { API_GetMachines, API_GetWashingTypes } from "@env";

export interface Machine {
  id: number;
  name: string;
  capacity: number;
  model: string;
  locationId: number;
  locationName: string;
  status: "running" | "available" | "maintenance" | string;
}

export type washingType = {
  id: number;
  typeName: string;
  defaultDuration: number;
  defaultPrice: number;
};

// Hàm xử lý lỗi chung
const handleError = (error: any, message: string) => {
  if (error.response) {
    // Lỗi phản hồi từ server
    console.error(`${message}:`, error.response.data);
  } else if (error.request) {
    // Lỗi do không nhận được phản hồi
    console.error(`${message}: No response from server`);
  } else {
    // Lỗi khác
    console.error(`${message}:`, error.message);
  }
};

// Lấy danh sách tất cả máy giặt
const getMachines = async () => {
  try {
    const response = await axios.get(API_GetMachines);
    console.log("Get machines:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to get machines");
    return [];
  }
};

// Lấy thông tin máy giặt theo ID
const getMachineById = async (id: number) => {
  try {
    const response = await axios.get(`${API_GetMachines}/${id}`);
    console.log("Get machine by id:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, `Failed to get machine with id ${id}`);
    return null;
  }
};

// Lấy danh sách các loại giặt
const getWashingTypes = async () => {
  try {
    // console.log("API: ", API_GetWashingTypes);
    const response = await axios.get(API_GetWashingTypes);

    console.log("Get washing types:", response.data);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to get washing types");
    return [];
  }
}
export { getMachines, getMachineById, getWashingTypes };