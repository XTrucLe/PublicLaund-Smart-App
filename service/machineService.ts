import { handleError } from "./ErrorExeption";
import callAPI from "@/hooks/useCallAPI";

export type Timestamp = [number, number, number, number, number, number, number];

export interface Machine {
  id: number;
  name: string;
  capacity: number;
  model: string;
  status: "running" | "available" | "maintenance" | string;
}
export interface MachineData {
  id: number;
  name: string;
  capacity: number;
  model: string;
  status: "running" | "available" | "maintenance" | string;
  locationId: number;
  locationName: string;
  locationAddress: string;
}
export interface MachineUsage extends MachineData {
  washingTypeId: number;
  startTime: Timestamp;
  endTime: Timestamp;
}

export type WashingType = {
  id: number;
  typeName: string;
  defaultDuration: number;
  defaultPrice: number;
};

// Lấy danh sách tất cả máy giặt
const getMachines = async () => {
  console.log(1);

  try {
    return await callAPI(process.env.EXPO_PUBLIC_API_GetMachines as string, {}, "GET");
  } catch (error) {
    handleError(error, "Failed to get machines");
    return [];
  }
};

// Lấy danh sách các máy giặt sẵn có
var getAvailableMachines = async () => {
  
  try {
    var machines = await callAPI(process.env.EXPO_PUBLIC_API_GetMachines as string , {}, "GET");
    
    return machines.filter((machine: Machine) => machine.status.toLowerCase() === "available");
  } catch (error) {
    handleError(error, "Failed to get available machines");
    return [];
  }
};

// Lấy thông tin máy giặt theo ID
const getMachineById = async (id: number) => {
  try {
    return await callAPI(`${process.env.EXPO_PUBLIC_API_GetMachines}/${id}`, {}, "GET");
  } catch (error) {
    handleError(error, `Failed to get machine with id ${id}`);
    return null;
  }
};

// Lấy danh sách các loại giặt
var getWashingTypes = async () => {
  try {
    return await callAPI(process.env.EXPO_PUBLIC_API_GetWashingTypes as string, {}, "GET");
  } catch (error) {
    handleError(error, "Failed to get washing types");
    return [];
  }
};

// Lấy danh sách máy giặt đã đặt trước
var getMachineReversed = async () => {
  try {
    var data = await callAPI(process.env.EXPO_PUBLIC_API_GetMachineReversed as string, {}, "GET");
    if (!data) return [];
    return data;
  } catch (error) {
    handleError(error, "Failed to get reversed machines");
    return [];
  }
};

// Lấy danh sách máy giặt đang sử dụng
var getmachineInUse = async () => {
  try {
    return await callAPI(process.env.EXPO_PUBLIC_API_GetMachineInUse as string, {}, "GET");
  } catch (error) {
    handleError(error, "Failed to get machines in use");
    return [];
  }
};

export { getMachines, getAvailableMachines, getMachineById, getWashingTypes, getmachineInUse, getMachineReversed };
