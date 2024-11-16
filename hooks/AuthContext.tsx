import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { deleteUserInfo, fetchAndStoreUserInfo } from "@/service/authService";
import Toast from "react-native-toast-message";
import callAPI from "./useCallAPI";
import { usePushNotification } from "./usePushNotification";
interface AuthState {
  token: string | null;
  authenticated: boolean | null;
}

interface AuthContextProps {
  authState: AuthState;
  onRegister: (newUser: object) => Promise<{ error: boolean; message: string }>;
  onLogin: (usernameOrEmail: string, password: string) => Promise<{ error: boolean; message: string }>;
  onLogout: () => Promise<void>;
}

const TOKEN_KEY = "Token";
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          setAuthState({ token, authenticated: true });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          setAuthState({ token: null, authenticated: false });
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };
    loadToken();
  }, []);

  const apiCall = async (url: string, data: object) => {
    try {
      const response = await axios.post(url, data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };

  const storeToken = async (token: string) => {
    try {
      setAuthState({ token, authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      console.log("Token stored successfully");
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const onRegister = async (newUser: object) => {
    console.log("newUser", newUser);
    
    try {
      const data = await apiCall(process.env.EXPO_PUBLIC_API_Register as string, newUser);
      if (data.error) {
        return { error: true, message: data.message };
      }
      return { error: false, message: "User registered successfully" };
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  };

  let  onLogin = async (usernameOrEmail: string, password: string) => {
    let logInfor = { usernameOrEmail: usernameOrEmail, password: password };
    console.log("logInfor1", logInfor, "EXPO_PUBLIC_API_Login", process.env.EXPO_PUBLIC_API_Login);
    
    try {
      var data = await apiCall(process.env.EXPO_PUBLIC_API_Login as string, logInfor);
      if (data.error) {
        return { error: true, message: data.message };
      }
      
      await storeToken(data.accessToken);  
      return { error: false, message: "User logged in successfully" };
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      return { error: true, message: error.message };
    }
  };

  const onLogout = async () => {
    try {
      console.log("User logged out successfully", SecureStore);
      await deleteUserInfo();
      // Remove token from SecureStore
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      // Reset authentication state
      setAuthState({ token: null, authenticated: false });

      // Remove Authorization header from axios
      delete axios.defaults.headers.common["Authorization"];

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error instanceof Error ? error.message : error);
    }
  };

  const value = {
    authState,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};