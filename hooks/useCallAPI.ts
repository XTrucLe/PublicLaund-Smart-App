import { handleError } from "@/service/ErrorException";
import axios, { Method } from "axios";

// Generalized API call function with support for different HTTP methods
var callAPI = async (
  url: string,
  data: object = {},
  method: Method = "POST"
) => {
  try {
    var response = await axios({
      url,
      method,
      data: method === "POST" || method === "PUT" ? data : undefined, // Only include data for methods that support a body
      params: method === "GET" ? data : undefined, // Include data as params for GET requests
    });
    // console.log(response.config);

    return response.data;
  } catch (error) {
    handleError(error, "An error occurred while making the API call");
    return [];
  }
};

export default callAPI;
