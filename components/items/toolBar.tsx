import React from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Bạn có thể chọn kiểu icon khác nếu muốn
import { NavigationProps } from '../navigation';
import { useNavigation } from '@react-navigation/native';

export default function Toolbar() {
const navigation= useNavigation<NavigationProps<"Home">>();

  const handleMapPress = () => {
    // Thực hiện thao tác khi nhấn vào Map icon
  };

  const handleQRPress = () => {
    // Thực hiện thao tác khi nhấn vào QR code icon
    navigation.navigate("QRCodeScreen");
  };

  const handleHistoryPress = () => {
    // Thực hiện thao tác khi nhấn vào History icon
  };

  return (
    <View style={styles.toolbar}>

      {/* Các icon button */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleMapPress}>
          <Icon name="map-outline" size={24} color="blue" />
          <Text style={styles.iconLabel}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleQRPress}>
          <Icon name="qr-code-outline" size={24} color="blue" />
          <Text style={styles.iconLabel}>QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHistoryPress}>
          <Icon name="time-outline" size={24} color="blue" />
          <Text style={styles.iconLabel}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
});
