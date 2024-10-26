import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type SettingItemProps = {
  icon?: string;
  label?: string;
  onPress?: () => void;
};

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    {icon && <Ionicons name={icon as any} size={24} color="gray" />}
    <Text style={styles.settingText}>{label}</Text>
    <Ionicons name="chevron-forward" size={24} color="gray" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
    maxWidth: 400,
  },
  settingText: {
    fontSize: 18,
    color: "#333",
  },
});
