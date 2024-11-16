import { RootParamList } from '@/components/navigation/type'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import QRCodeScreen from './QRcodeScreen'
import OwnerScreen from '../settings/OwnerScreen'
import MachineDataScreen from './MachineDataScreen'

const Stack= createStackNavigator<RootParamList>()
export default function OwnerLayout() {
  return (
    <Stack.Navigator initialRouteName='QRCodeScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen}/>
        <Stack.Screen name="OwnerScreen" component={OwnerScreen}/>
        <Stack.Screen name="MachineDataScreen" component={MachineDataScreen}/>
    </Stack.Navigator>
  )
}