import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletScreen from "./WalletScreen";
import TopUpScreen from "./TopUpScreen";
import WithdrawScreen from "./WithdrawScreen";

export default function WalletStackLayout() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="WalletScreen"
      
    >
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{ title: "Wallet" }}
      />
      <Stack.Screen
        name="TopUpScreen"
        component={TopUpScreen}
        options={{ title: "Top Up", headerShown: true }}
      />
      <Stack.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
        options={{ title: "Withdraw", headerShown: true }}
      />
    </Stack.Navigator>
  );
}
