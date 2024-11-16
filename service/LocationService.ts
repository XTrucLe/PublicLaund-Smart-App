import { handleError } from "./ErrorExeption";
import callAPI from "@/hooks/useCallAPI";

export interface Location {
  locationId: number;
  locationName: string;
  locationAddress: string;
  locationCity: string;
  locationDistrict: string;
  locationLat: string;
  locationLng: string;
  locationWard: string;
}
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
    return await callAPI(process.env.EXPO_PUBLIC_API_GetLocations as string, {}, "GET");
  } catch (error) {
    handleError(error, "Failed to get machine locations");
    return [];
  }
};

export { getCurrentLocation, getMachineLocations };
