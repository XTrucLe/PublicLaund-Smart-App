import axios from "axios";
import { API_Reservation, API_StartUsingMachine, API_CancelUsingMachine } from "@env";

const reservationMachine = async (data: { machineId: number; washingTypeId: number }) => {
  var reversationURL = API_Reservation;

  try {
    var response = await axios.post(reversationURL, data);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ reservationMachine ~ error:", error);
  }
};

const startUsingMachine = async () => {
  var startUsingUrl = API_StartUsingMachine;
  console.log("API_StartUsingMachine: ", startUsingUrl);

  try {
    var response = await axios.put(startUsingUrl);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ startUsingMachine ~ error:", error);
  }
};

const cancelUsingMachine = async (id: number) => {
  var cancelUsingUrl = API_CancelUsingMachine.replace("{id}", id.toString());
  console.log("API_CancelUsingMachine: ", cancelUsingUrl);

  try {
    const response = await axios.put(cancelUsingUrl, id);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ startUsingMachine ~ error:", error);
  }
};

export { reservationMachine, startUsingMachine, cancelUsingMachine };
