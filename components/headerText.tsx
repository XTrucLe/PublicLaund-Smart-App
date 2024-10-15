import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface HeaderTextProps {
  text: string;
  style?: TextStyle; // Cho phép tùy chỉnh style từ bên ngoài
}

const HeaderText: React.FC<HeaderTextProps> = ({ text, style }) => {
  return <Text style={[style, styles.headerText]}>{text}</Text>;
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 16,
  },
});
export default HeaderText;
