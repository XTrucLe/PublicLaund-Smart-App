import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";

const OwnerHeader = () => {
  const navigation = useNavigation<NavigationProps<"Home" | "SettingScreen">>();
  const handleNavigate = () => {
    navigation.navigate("QRCodeScreen");
  };

  const handleWithdraw = () => {
    navigation.navigate("OwnerWithdrawScreen");
  };
  return (
    <View style={{ paddingRight: 24, flexDirection: "row" }}>
      <Pressable style={styles.withdrawIcon} onPress={handleWithdraw}>
        <Ionicons name="wallet-outline" size={24} color="#4CAF50" />
        <Entypo
          name="arrow-down"
          size={13}
          color="#4CAF50"
          style={styles.arrow}
        />
      </Pressable>
      <Ionicons name="qr-code-outline" size={24} onPress={handleNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  withdrawIcon: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: 16,
  },
  arrow: {
    marginTop: -10,
    right: -12,
  },
});

export default OwnerHeader;
