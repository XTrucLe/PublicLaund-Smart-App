import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface Props {
  name: string;
  onSelect: () => void;
  isSelected: boolean;
}

const LaundryOption: React.FC<Props> = ({ name, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={onSelect}
    >
      <View style={styles.optionContent}>
        <Text style={styles.optionText}>{name}</Text>
        {isSelected && (
          <MaterialIcons name="check-circle" size={24} color="green" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    // Elevation for Android
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#d0f0d0", // Màu nền khác khi được chọn
  },
  optionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 10,
  },
});

export default LaundryOption;
