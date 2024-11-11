import { RootParamList } from '@/components/navigation/type'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import QRCodeScreen from './QRcodeScreen'

const Stack= createStackNavigator<RootParamList>()
export default function OwnerLayout() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen}/>
      {/* <Stack.Screen name="OwnerScreen" component={OwnerScreen} />
      <Stack.Screen name="OwnerMachineScreen" component={OwnerMachineScreen} />
      <Stack.Screen name="OwnerMachineDetailScreen" component={OwnerMachineDetailScreen} /> */}
    </Stack.Navigator>
  )
}