import { API_GetLocations } from "@env";
import axios from "axios";

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

const getMachineLocations = async () => {
  const locationUrl = API_GetLocations;
  try {
    const response = await axios.get(locationUrl);
    console.log("Machine locations:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting machine locations:", error);
    throw error;
  }
};
export { getCurrentLocation, getMachineLocations };
