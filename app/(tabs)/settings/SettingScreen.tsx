import { SettingItem } from "@/components/items/settingItem";
import { View } from "react-native";
import { useAuth } from "../../../hooks/AuthContext";
import { NavigationProps } from "@/components/navigation";

type Props = {
  navigation: NavigationProps<"SettingScreen">;
};
export default function SettingScreen({ navigation }: Props) {
  const { onLogout, authState } = useAuth();
  const settingsOptions = [
    { id: "account", icon: "person", label: "Thông tin tài khoản" },
    { id: "notifications", icon: "notifications", label: "Cài đặt thông báo" },
    {
      id: "owner",
      icon: "home",
      label: "Chủ sở hữu máy giặt",
      onPress: () => {
        console.log("navigation");
        
        navigation.navigate("OwnerScreen");
      },
    },
    { id: "payment", icon: "wallet", label: "Cài đặt thanh toán" },
    { id: "language", icon: "language", label: "Ngôn ngữ" },
    {
      id: "checkout",
      icon: "exit-outline",
      label: "Thoát",
      onPress: () => {
        if (authState.authenticated) onLogout?.();
      },
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {settingsOptions.map((option) => (
        <SettingItem key={option.id} icon={option.icon} label={option.label} onPress={option.onPress}/>
      ))}
    </View>
  );
}
