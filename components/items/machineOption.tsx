import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface Props {
  name: string;
  duration: number;
  onSelect: () => void;
  isSelected: boolean;
}

const LaundryOption: React.FC<Props> = ({ name, duration, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={onSelect}
    >
      <View style={styles.optionContent}>
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>{name}</Text>
          <Text style={styles.durationText}>~{duration} phút</Text>
        </View>
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
  textContainer: {
    flexDirection: "column", // Chuyển thành cột để hiển thị tên và thời gian theo hàng dọc
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  durationText: {
    fontSize: 14,
    color: "#555", // Màu nhạt hơn cho thời gian
    marginTop: 4,
  },
});

export default LaundryOption;
