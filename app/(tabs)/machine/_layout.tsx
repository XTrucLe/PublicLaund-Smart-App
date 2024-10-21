import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MachineScreen from "./MachineScreen";
import ConfirmScreen from "./ConfirmScreen";
import OptionsScreen from "./OptionsScreen";
import { RootParamList } from "@/components/navigation/type";
import NoticeStatus from "./NoticeStatus";

const Stack = createNativeStackNavigator<RootParamList>();
export default function MachineStackLayout() {
  return (
    <Stack.Navigator initialRouteName="MachineScreen">
      <Stack.Screen
        name="MachineScreen"
        component={MachineScreen}
        options={{ title: "Machine" }}
      />
      <Stack.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={{ title: "Options" }}
      />
      <Stack.Screen
        name="ConfirmScreen"
        component={ConfirmScreen}
        options={{ title: "Confirm" }}
      />
      <Stack.Screen
        name="NoticeStatus"
        component={NoticeStatus}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
