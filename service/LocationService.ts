import callAPI from "@/hooks/useCallAPI";

export type Location = {
  id: number;
  name: string;
  address: string | null;
  city: string | null; // Thành phố có thể là null
  district: string | null; // Quận có thể là null
  ward: string | null; // Phường có thể là null
  machineCount: number;
  lat: number; // Vĩ độ
  lng: number; // Kinh độ
  machineIds: number[]; // Mảng các ID của máy móc
};
// Lấy vị trí hiện tại
const getCurrentLocation = async () => {
  try {
    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
    return location;
  } catch (error) {
    console.error("Error getting location:", error);
    throw error;
  }
};

// Lấy danh sách vị trí của các máy giặt
const getMachineLocations = async () => {
  try {
    return await callAPI(
      process.env.EXPO_PUBLIC_API_GetLocations as string,
      {},
      "GET"
    );
  } catch (error) {
    return [];
  }
};

const getAllLocations = async () => {
  try {
    return await callAPI(
      process.env.EXPO_PUBLIC_API_GetLocations as string,
      {},
      "GET"
    );
  } catch (error) {
    return [];
  }
};

export { getCurrentLocation, getMachineLocations };
