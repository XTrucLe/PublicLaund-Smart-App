import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, loading = false, disabled = false }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    backgroundColor: "#1976D2",
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: "#BDBDBD",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomButton;
