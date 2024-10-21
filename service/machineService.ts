import axios from "axios";
import {
  API_GetMachineInUse,
  API_GetMachineReversed,
  API_GetMachines,
  API_GetWashingTypes,
} from "@env";
import { handleError } from "./ErrorExeption";

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

// Lấy danh sách tất cả máy giặt
const getMachines = async () => {
  let machineUrl = API_GetMachines;
  
  try {
    const response = await axios.get(machineUrl);
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

    return response.data;
  } catch (error) {
    handleError(error, "Failed to get washing types");
    return [];
  }
};
// Lấy danh sách máy giặt đã đặt trước
const getMachineReversed = async (id: number) => {
  let reversedMachinesurl = `${API_GetMachineReversed}/${id}`;

  try {
    const response = await axios.get(reversedMachinesurl);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to get machines");
    return [];
  }
};

// Lấy danh sách máy đang sử dụng
const getmachineInUse = async (id: number) => {
  let inUseMachinesurl = `${API_GetMachineInUse}/${id}`;

  try {
    const response = await axios.get(inUseMachinesurl);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to get machines");
    return [];
  }
};

export { getMachines, getMachineById, getWashingTypes, getmachineInUse, getMachineReversed };
