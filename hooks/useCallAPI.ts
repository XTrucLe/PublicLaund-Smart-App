import { handleError } from "@/service/ErrorExeption";
import axios, { AxiosError, Method } from "axios";

// Generalized API call function with support for different HTTP methods
var callAPI = async (url: string, data: object = {}, method: Method = "POST") => {
  try {

    var response = await axios({
      url,
      method,
      data: method === "POST" || method === "PUT" ? data : undefined, // Only include data for methods that support a body
      params: method === "GET" ? data : undefined, // Include data as params for GET requests
    });
    
    
    return response.data;
  } catch (error) {
    handleError(error, "An error occurred while making the API call");
    if (axios.isAxiosError(error)) {
      // Extracts and throws the error message from the response if available
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export default callAPI; 