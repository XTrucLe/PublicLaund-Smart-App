import { API_GetLocations } from "@env";
import axios from "axios";
import { handleError } from "./ErrorExeption";
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
  let locationUrl = API_GetLocations;

  try {
    const response = await axios.get(locationUrl);
    
    if (response.data) 
      return response.data;
    else return [];
  } catch (error) {
    handleError(error, "Failed to get machine locations");
    return [];
  }
};
export { getCurrentLocation, getMachineLocations };
