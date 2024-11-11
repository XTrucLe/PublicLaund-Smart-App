import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MachineData } from "@/service/machineService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";
import { useStatusMachine } from "@/hooks/useStatusMachine";

const AvailableMachineView: React.FC<MachineData> = ({
  id,
  name,
  status,
  capacity,
  model,
  locationName,
}) => {
  const navigation = useNavigation<NavigationProps<"Home"|"MachineScreen">>();
  const { color, label } = useStatusMachine(status);

  const handleNavigate = () => {
    navigation.navigate("OptionsScreen", { id });
  };

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <Header id={id} color={color} />
      <Content 
        name={name} 
        capacity={capacity} 
        model={model} 
        locationName={locationName} 
        label={label} 
      />
    </Pressable>
  );
};

const Header = React.memo(({ id, color }: { id: number; color: string }) => (
  <View style={styles.header}>
    <Text style={styles.machineText}>Máy giặt số #{id}</Text>
    <View style={[styles.statusCircle, { backgroundColor: color || "lightgray" }]} />
  </View>
));

const Content = React.memo(({ name, capacity, model, locationName, label }: { name: string; capacity: number; model: string; locationName: string; label: string }) => (
  <View style={styles.content}>
    <MaterialIcons name="local-laundry-service" size={36} color="#000" style={styles.icon} />
    <View style={styles.detailsContainer}>
      <View style={styles.details}>
        <Text style={styles.detailsText} numberOfLines={1} ellipsizeMode="tail">Tên máy: {name}</Text>
        <Text style={styles.detailsText} numberOfLines={1} ellipsizeMode="tail">Dung tích: {capacity} kg</Text>
        <Text style={styles.detailsText} numberOfLines={1} ellipsizeMode="tail">Model: {model}</Text>
        <Text style={styles.detailsText} numberOfLines={1} ellipsizeMode="tail">Vị trí: {locationName}</Text>
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f7f7f7",
    opacity: 0.9,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: "#b3e5fc",
  },
  machineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  details: {
    marginBottom: 10,
    maxWidth: "65%",
  },
  detailsText: {
    fontSize: 14,
    color: "#333",
    overflow: "hidden",
  },
  icon: {
    marginLeft: 4,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "transparent",
    padding: 4,
    borderRadius: 8,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default AvailableMachineView;
