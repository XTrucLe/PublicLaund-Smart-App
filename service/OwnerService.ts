import callAPI from "@/hooks/useCallAPI";

const getTotalRevenue = async (
  condition?: string,
  month?: number,
  year?: number
) => {
  let api = process.env.EXPO_PUBLIC_API_GetTotalReveue as string;

  // Kiểm tra điều kiện và thêm phần tháng hoặc năm vào API URL
  if (condition === "month" && month) {
    api = `${
      process.env.EXPO_PUBLIC_API_GetTotalReveueByMonth as string
    }/${month}/year/${year}`;
  } else if (condition === "year" && year) {
    api = `${
      process.env.EXPO_PUBLIC_API_GetTotalReveueByYear as string
    }/${year}`;
  }

  try {
    const response = await callAPI(api, {}, "GET");
    console.log(response);
    return response;
  } catch (error) {
    return 0;
  }
};

const getNumberUsingByMonth = async (month: number) => {
  var api = process.env.EXPO_PUBLIC_API_GetNumberUsingByMonth as string;

  try {
    const response = await callAPI(`${api}/${month}`, {}, "GET");

    if (response) {
      return response;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};

export { getTotalRevenue, getNumberUsingByMonth };
