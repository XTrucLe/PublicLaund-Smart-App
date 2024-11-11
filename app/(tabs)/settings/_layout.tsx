

import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootParamList } from '@/components/navigation/type'
import SettingScreen from './SettingScreen'
import OwnerScreen from './OwnerScreen'
import OwnerLayout from '../owner/_layout'

const Stack= createStackNavigator<RootParamList>()

export default function SettingLayout() {
  return (
    <Stack.Navigator initialRouteName='SettingScreen'>
      <Stack.Screen name="SettingScreen" component={SettingScreen}/>
      <Stack.Screen name="OwnerScreen" component={OwnerScreen}/>
      <Stack.Screen name="QRCodeScreen" component={OwnerLayout}/>
      
    </Stack.Navigator>
  )
}