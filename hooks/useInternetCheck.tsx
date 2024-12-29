import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useAuth } from "./AuthContext";

const InternetCheck = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const { onLogout } = useAuth();

  useEffect(() => {
    // Lắng nghe trạng thái kết nối
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected === false && isConnected !== false) {
        // Hiển thị Alert khi mất kết nối
        Alert.alert(
          "No Internet Connection",
          "You are offline. Do you want to logout?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: onLogout },
          ],
          { cancelable: true }
        );
      }
      setIsConnected(state.isConnected);
    });

    // Hủy lắng nghe khi component unmount
    return () => unsubscribe();
  }, [isConnected, onLogout]);

  return (
    <View style={styles.container}>
      {isConnected === null ? (
        <Text>Checking Internet Connection...</Text>
      ) : isConnected ? (
        <Text style={styles.connected}>You are online!</Text>
      ) : (
        <Text style={styles.disconnected}>You are offline!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  connected: {
    color: "green",
    fontSize: 18,
  },
  disconnected: {
    color: "red",
    fontSize: 18,
  },
});

export default InternetCheck;
