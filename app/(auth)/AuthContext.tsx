import { API_Login, API_Register } from "@env";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const token_key = "jwt_token";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  //loading
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(token_key);
        if (token) {
          setAuthState({ token, authenticated: true });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          setAuthState({ token: null, authenticated: false });
        }
      } catch (e) {
        return { error: true, message: (e as any).message };
      }
    };
  }, []);

  const apiCall = async (url: string, data: object) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message || e.message);
      }
      throw new Error("Unknown error occurred");
    }
  };

  const storeToken = async (token: string) => {
    try {
      setAuthState({ token, authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await SecureStore.setItemAsync(token_key, token);
    } catch (e) {
      console.error("Error storing token:", e);
    }
  };

 const onRegister = async (email: string, password: string) => {
    const regisURL = API_Register;
    try {
      const data = await apiCall(regisURL, { email, password });

      if (data.error) {
        return { error: true, message: data.message };
      }

      return { error: false, message: "User registered successfully" };
    } catch (error) {
      return { error: true, message: (error as any).message };
    }
  };

  const onLogin = async (email: string, password: string) => {
    const loginUrl = API_Login;
    try {
      // const data = await apiCall(loginUrl, { email, password });
      const data = {
        token: "kaksbaisczkajwhvsau",
        error: false,
        message: "User logged in successfully",
      };

      //lưu token vào secure store cho lần sử dụng sau
      await storeToken(data.token);

      if (data.error) {
        return { error: true, message: data.message };
      }
      return { error: false, message: "User logged in successfully" };
    } catch (error) {
      return { error: true, message: (error as any).message };
    }
  };

  const onLogout = async () => {
    //xóa token khỏi secure store
    await SecureStore.deleteItemAsync(token_key);
    //reset auth state
    setAuthState({ token: null, authenticated: false });
    //xóa token khỏi axios header
    axios.defaults.headers.common["Authorization"] = "";
  };

  const value = {
    onRegister: onRegister,
    onLogin: onLogin,
    onLogout: onLogout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
