import axios from "axios";

const reservationMachine = async (data: {
  machineId: number;
  washingTypeId: number;
}) => {
  var reversationURL = process.env.EXPO_PUBLIC_API_Reservation as string;

  try {
    var response = await axios.post(reversationURL, data);

    return response;
  } catch (error) {
    console.log("🚀 ~ reservationMachine ~ error:", error);
  }
};

const startUsingMachine = async () => {
  var startUsingUrl = process.env.EXPO_PUBLIC_API_StartUsingMachine as string;
  console.log("EXPO_PUBLIC_API_StartUsingMachine: ", startUsingUrl);

  try {
    var response = await axios.put(startUsingUrl);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ startUsingMachine ~ error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const cancelUsingMachine = async (id: number) => {
  var cancelUsingUrl = process.env.EXPO_PUBLIC_API_CancelUsingMachine as string;
  console.log("EXPO_PUBLIC_API_CancelUsingMachine: ", cancelUsingUrl);

  try {
    const response = await axios.put(cancelUsingUrl, id);

    return response.status;
  } catch (error) {
    console.log("🚀 ~ startUsingMachine ~ error:", error);
  }
};

const getReservationHistory = async () => {
  var getReservationHistoryUrl = process.env
    .EXPO_PUBLIC_API_GetReservationHistory as string;

  try {
    const response = await axios.get(getReservationHistoryUrl);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getReservationHistory ~ error:", error);
  }
};

export {
  reservationMachine,
  startUsingMachine,
  cancelUsingMachine,
  getReservationHistory,
};
