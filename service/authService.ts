import callAPI from "@/hooks/useCallAPI";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Timestamp } from "./machineService";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  fullname: string;
  phone: string;
  balance: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  roleName: string;
}

const API_GET_USER_INFO = process.env.EXPO_PUBLIC_API_GetUserInfo as string;

// Fetch user information from API and store it securely
const fetchAndStoreUserInfo = async (): Promise<{
  error: boolean;
  message?: string;
}> => {
  try {
    const data = await callAPI(API_GET_USER_INFO, {}, "GET");
    await SecureStore.setItemAsync("UserInfo", JSON.stringify(data));
    return { error: false };
  } catch (error: any) {
    console.error("Error fetching user info from API:", error.message);
    return { error: true, message: error.message };
  }
};

// Retrieve user information from secure storage
const getUserInfoFromStorage = async (): Promise<{
  error: boolean;
  data?: UserInfo;
  message?: string;
}> => {
  try {
    const userInfo = await SecureStore.getItemAsync("UserInfo");
    if (userInfo) {
      return { error: false, data: JSON.parse(userInfo) as UserInfo };
    }
    return { error: true, message: "No user information found in storage" };
  } catch (error: any) {
    console.error("Error retrieving user info from storage:", error.message);
    return { error: true, message: error.message };
  }
};

// Custom hook to manage user information state
const useUserInfo = (): UserInfo | null => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchStoredUserInfo = async () => {
      const response = await getUserInfoFromStorage();

      if (!response.error && response.data) {
        setUserInfo(response.data);
      } else {
        const fetchResponse = await fetchAndStoreUserInfo();

        if (!fetchResponse.error) {
          const newUserInfoResponse = await getUserInfoFromStorage();
          if (!newUserInfoResponse.error && newUserInfoResponse.data) {
            setUserInfo(newUserInfoResponse.data);
          }
        } else console.error("Error retrieving user info:", response.message);
      }
    };

    fetchStoredUserInfo();
  }, []);

  return userInfo;
};

// Delete user information from secure storage
const deleteUserInfo = async () => {
  try {
    await SecureStore.deleteItemAsync("UserInfo");
  } catch (error) {
    console.error("Error deleting user info:", error);
  }
};

export {
  fetchAndStoreUserInfo,
  getUserInfoFromStorage,
  deleteUserInfo,
  useUserInfo,
};
