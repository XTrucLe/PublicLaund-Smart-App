

import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootParamList } from '@/components/navigation/type'
import SettingScreen from './SettingScreen'
import OwnerLayout from '../owner/_layout'

const Stack= createStackNavigator<RootParamList>()

export default function SettingLayout() {
  return (
    <Stack.Navigator initialRouteName='SettingScreen'>
      <Stack.Screen name="SettingScreen" component={SettingScreen}/>
      <Stack.Screen name="OwnerLayout" component={OwnerLayout}/>
    </Stack.Navigator>
  )
}