import React from "react";
import MachineView from "@/components/items/machineItem";
import { FlatList, RefreshControl } from "react-native";
import { Machine } from "@/service/machineService";

type MachineListProps = {
  data: Machine[];
  refreshing: boolean;
};

const MachineList: React.FC<MachineListProps> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <MachineView
        id={item.id}
        status={item.status}
        name={item.name}
        capacity={item.capacity}
        locationId={item.locationId}
        locationName={item.locationName}
        model={item.model}
      />
    )}
  />
);

export default MachineList;
