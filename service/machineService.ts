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
  secretId?: string;
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
  console.log(process.env.EXPO_PUBLIC_API_GetMachines);

  try {
    var machines = await callAPI(
      process.env.EXPO_PUBLIC_API_GetMachines as string,
      {},
      "GET"
    );

    return machines;
  } catch (error) {
    console.log("error", error);

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

const checkCode = async (hashKey: string) => {
  let checkHashKeyUrl = process.env.EXPO_PUBLIC_API_CheckHashCode as string;

  console.log("checkCode", checkHashKeyUrl, hashKey);

  try {
    return await callAPI(checkHashKeyUrl, { hashKey }, "POST");
  } catch (error) {
    return false;
  }
};

const checkAvailable = async (id: number) => {
  const checkAvailableMachineUrl =
    (process.env.EXPO_PUBLIC_API_CheckAvailableMachine as string) + "/" + id;
  console.log("checkAvailable", checkAvailableMachineUrl);

  try {
    return await callAPI(checkAvailableMachineUrl, {}, "POST");
  } catch (error) {
    return false;
  }
};

const reportErrorMachine = async (secretId: string) => {
  try {
    return await callAPI(
      process.env.EXPO_PUBLIC_API_ReportErrorMachine as string,
      { secretId },
      "PUT"
    );
  } catch (error) {
    return false;
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
  checkCode,
  checkAvailable,
};
