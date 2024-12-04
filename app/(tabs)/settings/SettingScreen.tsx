import { SettingItem } from "@/components/items/settingItem";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../hooks/AuthContext";
import { NavigationProps } from "@/components/navigation";
import { useUserInfo } from "@/service/authService";

type Props = {
  navigation: NavigationProps<"SettingScreen">;
};
export default function SettingScreen({ navigation }: Props) {
  const { onLogout, authState } = useAuth();
  const userInfo = useUserInfo();
  const imgUrl = "";
  const settingsOptions = [
    { id: "account", icon: "person", label: "Thông tin tài khoản" },
    {
      id: "owner",
      icon: "home",
      label: "Chủ sở hữu máy giặt",
      onPress: () => {
        navigation.navigate("OwnerLayout");
      },
    },
    {
      id: "payment",
      icon: "wallet",
      label: "Cài đặt thanh toán",
      onPress: () => navigation.navigate("BankAccountScreen"),
    },
    { id: "notifications", icon: "notifications", label: "Cài đặt thông báo" },
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
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {imgUrl ? (
          <Image source={{ uri: imgUrl }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitial}>
              {userInfo?.fullname?.charAt(0)}
            </Text>
          </View>
        )}
        <Text style={styles.profileName}>{userInfo?.fullname}</Text>
      </View>
      <View style={styles.settingsContainer}>
        {settingsOptions.map((option) => (
          <SettingItem
            key={option.id}
            icon={option.icon}
            label={option.label}
            onPress={option.onPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 40,
    color: "#fff",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
