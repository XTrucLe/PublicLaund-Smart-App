import { SettingItemProps } from "@/service/SettingService";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Switch, Text, TouchableOpacity } from "react-native";

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  onToggle,
}) => (
  <TouchableOpacity style={styles.settingItem}>
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
