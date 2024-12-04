import { RootParamList } from "@/components/navigation/type";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import QRCodeScreen from "./QRcodeScreen";
import MachineDataScreen from "./MachineDataScreen";
import HomeOwnerScreen from "./HomeOwnerScreen";
import OwnerHeader from "@/components/header/OwnerHeader";
import SelectLocationScreen from "./SelectLocation";
import OwnerWithdrawScreen from "./WithdrawScreen";

const Stack = createStackNavigator<RootParamList>();

export default function OwnerLayout() {
  return (
    <Stack.Navigator
      initialRouteName="HomeOwnerScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="HomeOwnerScreen"
        component={HomeOwnerScreen}
        options={{
          headerShown: true,
          headerTitle: "Tổng quan",
          headerRight: () => <OwnerHeader />,
        }}
      />
      <Stack.Screen
        name="QRCodeScreen"
        component={QRCodeScreen}
        options={{ headerShown: true, headerTitle: "Quay lại" }}
      />
      <Stack.Screen
        name="MachineDataScreen"
        component={MachineDataScreen}
        options={{ headerShown: true, headerTitle: "Quay lại" }}
      />
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
      />
      <Stack.Screen
        name="OwnerWithdrawScreen"
        component={OwnerWithdrawScreen}
        options={{ headerShown: true, headerTitle: "Quay lại" }}
      />
    </Stack.Navigator>
  );
}
