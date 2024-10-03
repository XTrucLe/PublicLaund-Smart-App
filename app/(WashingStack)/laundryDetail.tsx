import React from "react";
import { View, Button, StyleSheet } from "react-native";
import InfoRow from "@/components/container/washingStep/inforRow";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/components/container/washingStep/type";

type LaundryDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LaundryDetail"
>;


export default function LaundryDetail() {
  const route = useRoute();
  const { washingType, machineId } = route.params as {
    washingType: {
      id: number;
      name: string;
      duration: string;
      price: number;
    },
    machineId: string;
  };
  const navigation = useNavigation<LaundryDetailScreenNavigationProp>();



  const handleConfirm = () => {
    navigation.navigate({
      name: 'Confirm',
      params: { washingType, machineId },
      merge: true
    });
    console.log(washingType, machineId);
  };

  return (
    <View style={styles.container}>
      <InfoRow label="Loại giặt" value={washingType.name} />
      <InfoRow label="Thời gian" value={washingType.duration} />
      <InfoRow label="Giá" value={`${washingType.price} VND`} />
      <Button title="Xác nhận" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
});
