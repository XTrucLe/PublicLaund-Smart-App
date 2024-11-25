import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation';

const OwnerHeader = () => {
    const navigation = useNavigation<NavigationProps<"Home"|"SettingScreen">>();
    const handleNavigate = () => {
        navigation.navigate("QRCodeScreen");
    }
  return (
    <View style={{paddingRight: 24 }}>
      <Ionicons name='qr-code-outline' size={24} onPress={handleNavigate}></Ionicons>
    </View>
  )
}


export default OwnerHeader