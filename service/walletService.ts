import callAPI from "@/hooks/useCallAPI";
import axios from "axios";

export const personInfor = {
  owner: "Bagus Yuliono",
  wallet_type: "Cá nhân",
  balance: "500,376,200.00",
  account_number: "9000032**171236",
  created_date: "01 tháng 10 năm 2017",
  updated_date: "08 tháng 10 năm 2017",
  transactions: [
    {
      date: "01 tháng 10 năm 2017",
      description: "Chi chuyển khoản cá nhân",
      amount: "-1,500,000.00",
    },
    {
      date: "01 tháng 10 năm 2017",
      description: "Chi chuyển khoản cá nhân",
      amount: "-300,000.00",
    },
  ],
};

const getWalletInfor = async () => {
  try {
    return await callAPI("", {}, "GET");
  } catch (error) {
    return [];
  }
};

const getTopUpLink = async (amount: number, name: string) => {
  const createQRLink = process.env.EXPO_PUBLIC_API_CreateQRLink as string;
  const productName = "PublicLaund Smart";
  const data = {
    productName: productName,
    price: amount,
    description: `Nạp tiền vào ví điện tử`,
  };

  try {
    const data1 = await axios.post(createQRLink, data);
    return data1.data;
  } catch (error) {
    console.error((error as Error).message);
    throw new Error("Failed to get top-up QR code");
  }
};

const getTransactionHistory = async () => {
  const transactionHistoryAPI = process.env
    .EXPO_PUBLIC_API_GetTransactionHistory as string;
  try {
    return callAPI(transactionHistoryAPI, {}, "GET");
  } catch (error) {
    return [];
  }
};

export { getWalletInfor, getTopUpLink, getTransactionHistory };
