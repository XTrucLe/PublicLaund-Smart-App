import axios, { AxiosError, Method } from "axios";

// Generalized API call function with support for different HTTP methods
const callAPI = async (url: string, data: object = {}, method: Method = "POST") => {
  
  try {
    const response = await axios({
      url,
      method,
      data: method === "POST" || method === "PUT" ? data : undefined, // Only include data for methods that support a body
      params: method === "GET" ? data : undefined, // Include data as params for GET requests
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extracts and throws the error message from the response if available
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export default callAPI; 