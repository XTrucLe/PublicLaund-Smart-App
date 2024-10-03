import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import LaundryOption from "../../components/container/washingStep/laundryOption";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/components/container/washingStep/type";
import { typeWashing } from "@/service/machineService";

// Kiểu cho navigation prop
type SelectLaundryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SelectLaundry"
>;

function SelectLaundry() {
  const { machineId } = useLocalSearchParams<{ machineId: string }>();
  const [selectedLaundry, setSelectedLaundry] = useState<{
    id: number;
    name: string;
    duration: string;
    price: number;
  } | null>(null);

  const navigation = useNavigation<SelectLaundryScreenNavigationProp>();

  const handleSelect = (item: {
    id: number;
    name: string;
    duration: string;
    price: number;
  }) => {
    setSelectedLaundry(item);
    console.log(machineId + " selected " + item.name);
  };

  const handleNext = () => {
    if (!selectedLaundry) {
      return alert("Vui lòng chọn loại đồ giặt trước khi tiếp tục.");
    }

    navigation.navigate({
      name: "LaundryDetail",
      params: {
        washingType: selectedLaundry,
        machineId: machineId,
      },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn loại đồ giặt:</Text>
      {typeWashing.map((item) => (
        <LaundryOption
          key={item.id}
          name={item.name}
          onSelect={() => handleSelect(item)}
          isSelected={item.id === selectedLaundry?.id}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Tiếp theo" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    padding: 10,
  },
});

export default SelectLaundry;
