import callAPI from "@/hooks/useCallAPI";
import axios from "axios";

export type Timestamp = [
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

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
  locationCity: string;
  locationDistrict: string;
  locationWard: string;
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
    return await callAPI(
      process.env.EXPO_PUBLIC_API_GetMachines as string,
      {},
      "GET"
    );
  } catch (error) {
    return [];
  }
};

// Lấy danh sách các máy giặt sẵn có
var getAvailableMachines = async () => {
  try {
    var machines = await callAPI(
      process.env.EXPO_PUBLIC_API_GetMachines as string,
      {},
      "GET"
    );
    return machines.filter(
      (machine: Machine) => machine.status.toLowerCase() === "available"
    );
  } catch (error) {
    return [];
  }
};

// Lấy thông tin máy giặt theo ID
const getMachineById = async (id: number) => {
  try {
    return await callAPI(
      `${process.env.EXPO_PUBLIC_API_GetMachines}/${id}`,
      {},
      "GET"
    );
  } catch (error) {
    return null;
  }
};

// Lấy danh sách các loại giặt
var getWashingTypes = async () => {
  try {
    return await callAPI(
      process.env.EXPO_PUBLIC_API_GetWashingTypes as string,
      {},
      "GET"
    );
  } catch (error) {
    return [];
  }
};

// Lấy danh sách máy giặt đã đặt trước
var getMachineReversed = async () => {
  try {
    var data = await callAPI(
      process.env.EXPO_PUBLIC_API_GetMachineReversed as string,
      {},
      "GET"
    );
    console.log("data", data);

    if (!data) return null;
    return data;
  } catch (error) {
    return null;
  }
};

// Lấy danh sách máy giặt đang sử dụng
var getmachineInUse = async () => {
  try {
    return await callAPI(
      process.env.EXPO_PUBLIC_API_GetMachineInUse as string,
      {},
      "GET"
    );
  } catch (error) {
    return [];
  }
};

const getMachineOwner = async () => {
  try {
    const data = await callAPI(
      process.env.EXPO_PUBLIC_API_GetMachineOwner as string,
      {},
      "GET"
    );
    console.log("data: ", data);

    return data;
  } catch (error) {
    return [];
  }
};

const addMachine = async (data: any) => {
  try {
    return await axios.post(
      process.env.EXPO_PUBLIC_API_AddMachine as string,
      data
    );
  } catch (error) {
    return null;
  }
};

export {
  getMachines,
  getAvailableMachines,
  getMachineById,
  getWashingTypes,
  getmachineInUse,
  getMachineReversed,
  getMachineOwner,
  addMachine,
};
