import callAPI from "@/hooks/useCallAPI";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  fullname: string;
  phone: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

// Fetch user information from API and store in secure storage
const fetchAndStoreUserInfo = async () => {
  console.log("Fetching user info from API", process.env.EXPO_PUBLIC_API_GetUserInfo);
  
  try {
    let data = await callAPI(process.env.EXPO_PUBLIC_API_GetUserInfo as string, {}, "GET");    
    await SecureStore.setItemAsync("UserInfo", JSON.stringify(data));
  } catch (error) {
    return { error: true, message: (error as any).message };
  }
};

// Retrieve user information from secure storage
let getUserInfoFromStorage = async () => {
  try {
    let userInfo = await SecureStore.getItemAsync("UserInfo");
    if (userInfo) {
      return { error: false, data: JSON.parse(userInfo) };
    } else {
      return { error: true, message: "No user information found in storage" };
    }
  } catch (error) {
    console.error("Error getting user info from storage:", error);
    return { error: true, message: (error as any).message };
  }
};

// Custom hook to manage user information state
const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchStoredUserInfo = async () => {
      try {
        console.log("Fetching user info from storage");
        
        const response = await getUserInfoFromStorage();
        console.log(response.data.id);
        
        if (!response.error) {
          setUserInfo(response.data);
        } else {
          console.error("Error retrieving user info:", response.message);
        }
      } catch (error) {
        console.error("Unexpected error fetching user info:", error);
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

export { fetchAndStoreUserInfo, getUserInfoFromStorage, deleteUserInfo, useUserInfo };
