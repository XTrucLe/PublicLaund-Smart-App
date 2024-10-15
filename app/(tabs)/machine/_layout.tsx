import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MachineScreen from "./MachineScreen";
import OptionLaundry from "./OptionsScreen";
import ConfirmScreen from "./ConfirmScreen";


const Stack = createNativeStackNavigator();

export default function MachineStackLayout(){
  return (
    <Stack.Navigator initialRouteName="MachineScreen">
      <Stack.Screen name="MachineScreen" component={MachineScreen} options={{ title: 'Machine' }} />
      <Stack.Screen name="OptionsScreen" component={OptionLaundry} options={{ title: 'Options' }} />
      <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} options={{ title: 'Confirm' }} />
    </Stack.Navigator>
  );
};
