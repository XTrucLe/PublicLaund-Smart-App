import {
  API_CancelUsingMachine,
  API_Reservation,
  API_StartUsingMachine,
} from "@env";
import axios from "axios";

const reservationMachine = async (data: {
  userId: number;
  machineId: number;
  washingTypeId: number;
}) => {
  var reversationURL = API_Reservation;

  try {
    const response = await axios.post(reversationURL, data);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ reservationMachine ~ error:", error);
  }
};

const startUsingMachine = async (id: number) => {
  const startUsingUrl = API_StartUsingMachine.replace("{id}", id.toString());
  console.log("API_StartUsingMachine: ", startUsingUrl);

  try {
    const response = await axios.put(startUsingUrl, id);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ startUsingMachine ~ error:", error);
  }
};

const cancelUsingMachine = async (id: number) => {
  const cancelUsingUrl = API_CancelUsingMachine.replace("{id}", id.toString());
  console.log("API_CancelUsingMachine: ", cancelUsingUrl);

  try {
    const response = await axios.put(cancelUsingUrl, id);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ startUsingMachine ~ error:", error);
  }
};

export { reservationMachine, startUsingMachine, cancelUsingMachine };
