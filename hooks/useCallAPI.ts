import { handleError } from "@/service/ErrorException";
import axios, { Method } from "axios";
import { useAuth } from "./AuthContext";

// Generalized API call function with support for different HTTP methods
var callAPI = async (
  url: string,
  data: object = {},
  method: Method = "POST"
) => {
  try {
    const response = await axios({
      url,
      method,
      data: method === "POST" || method === "PUT" ? data : undefined, // Only include data for methods that support a body
      params: method === "GET" ? data : undefined, // Include data as params for GET requests
    });

    return response.data;
  } catch (error) {
    handleError(error, "An error occurred while making the API call");
    console.log("Error response:", error);

    return [];
  }
};

export default callAPI;
