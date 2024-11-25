import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletScreen from "./WalletScreen";
import TopUpScreen from "./TopUpScreen";
import WithdrawScreen from "./WithdrawScreen";
import { RootParamList } from "@/components/navigation/type";
import ShowQRCodeScreen from "./ShowQRCodeScreen";

export default function WalletStackLayout() {
  const Stack = createNativeStackNavigator<RootParamList>();
  return (
    <Stack.Navigator initialRouteName="WalletScreen">
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{ title: "Wallet" }}
      />
      <Stack.Screen
        name="TopUpScreen"
        component={TopUpScreen}
        options={{ title: "Nạp tiền", headerShown: true }}
      />
      <Stack.Screen
        name="ShowQRCodeScreen"
        component={ShowQRCodeScreen}
        options={{ title: "QR thanh toán", headerShown: true }}
      />
      <Stack.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
        options={{ title: "Chuyển tiền", headerShown: true }}
      />
    </Stack.Navigator>
  );
}
