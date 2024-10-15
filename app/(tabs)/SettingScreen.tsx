import { SettingItem } from "@/components/items/settingItem";
import { settingsOptions } from "@/service/settingService";
import { View } from "react-native";

export default function SettingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {settingsOptions.map(option => (
        <SettingItem
          key={option.id}
          icon={option.icon}
          label={option.label}
        />
      ))}
    </View>
  );
}