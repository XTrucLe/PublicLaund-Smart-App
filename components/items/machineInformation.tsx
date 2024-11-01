import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


type MachineInformationProps = {
    name: string,
    capacity: number,
    model: string,
    locationName: string
    locationCity: string,
    locationDistrict: string,
}
const machineInformation = ({name, capacity, locationName, model, locationCity, locationDistrict}:MachineInformationProps) => {
    const location = locationCity + ", " + locationDistrict
  return (
      <View style={styles.detailsContainer}>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Tên máy: {name}
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Dung tích: {capacity} kg
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Model: {model}
          </Text>
          <Text
            style={styles.detailsText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Vị trí: {locationName}
          </Text>
          <View>
            <Ionicons name="location-outline" size={24} color="#black"/>
            <Text style={[styles.detailsText, {fontWeight:"400"}]}>{location}</Text>
          </View>
      </View>)
}

const styles= StyleSheet.create({
    detailsContainer: {
        marginBottom: 10,
      },
      detailsText: {
        fontSize: 14,
        color: "#555",
      },
    })
export default machineInformation