import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootParamList } from "@/components/navigation/type";
import HomeScreen from ".";
import OwnerLayout from "./owner/_layout";
import HeaderWellcome from "@/components/header/WellcomeHeader";
import MapLayout from "./map/_layout";
import HistoryMachineUsage from "./HistoryMachineUsage";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator<RootParamList>();

const HomeLayout = () => {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="index"
          component={HomeScreen}
          options={{ headerShown: true, header: () => <HeaderWellcome /> }}
        />
        <Stack.Screen name="OwnerLayout" component={OwnerLayout} />
        <Stack.Screen name="MapLayout" component={MapLayout} />
        <Stack.Screen
          name="HistoryMachineScreen"
          component={HistoryMachineUsage}
          options={{ title: "Lịch sử sử dụng máy", headerShown: true }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default HomeLayout;
