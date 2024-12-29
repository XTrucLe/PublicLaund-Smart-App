import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import NotificationScreen from "./NotificationScreen";
import WalletStackLayout from "./wallet/_layout";
import MachineStackLayout from "./machine/_layout";
import AuthenStack from "../(auth)/_layout";
import { AuthProvider, useAuth } from "../../hooks/AuthContext";
import SettingLayout from "./settings/_layout";
import HomeLayout from "./index/_layout";
import Toast from "react-native-toast-message";
import { onChildChange } from "@/service/FirebaseService";
import InternetCheck from "@/hooks/useInternetCheck";

const Tab = createBottomTabNavigator();

// Định nghĩa kiểu cho các tên icon
const iconNames = {
  Home: "home-outline",
  Machine: "cog-outline",
  Wallet: "wallet-outline",
  Notification: "notifications-outline",
  Setting: "settings-outline",
} as const;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <MainLayout />
      <Toast />
    </AuthProvider>
  );
}

const hideRoute = [
  "index",
  "Home",
  "Machine",
  "MachineScreen",
  "Wallet",
  "WalletScreen",
  "Notification",
  "Setting",
  "SettingScreen",
];

const MainLayout = () => {
  const { authState } = useAuth();
  InternetCheck();
  useEffect(() => {
    onChildChange();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        // Lấy tên màn hình đang hiển thị trong Stack
        const activeTab =
          navigation.getState()?.routes?.[navigation.getState()?.index];

        const activeStackRoute = activeTab?.state?.routes
          ? activeTab.state.routes.slice(-1)[0] // Nếu có Stack Navigator, lấy route cuối cùng
          : activeTab;

        return {
          tabBarIcon: ({ color, size }) => {
            const iconName = iconNames[route.name as keyof typeof iconNames]; // Lấy tên icon dựa vào route
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#87CEEB", // Màu khi tab đang hoạt động
          tabBarInactiveTintColor: "gray", // Màu khi tab không hoạt động
          tabBarHideOnKeyboard: true, // Ẩn tab khi bàn phím hiện lên
          tabBarStyle: {
            display: hideRoute.includes(activeStackRoute.name)
              ? "flex"
              : "none",
          },
        };
      }}
    >
      {!authState?.authenticated ? (
        <Tab.Screen
          name="authen"
          component={AuthenStack}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={HomeLayout}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              },
            })}
            options={{ headerShown: false, lazy: true }}
          />
          <Tab.Screen
            name="Machine"
            component={MachineStackLayout}
            options={{
              headerShown: false,
              lazy: true,
            }}
          />
          <Tab.Screen
            name="Wallet"
            component={WalletStackLayout}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Notification" component={NotificationScreen} />
          <Tab.Screen
            name="Setting"
            component={SettingLayout}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
