import React, { useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Machine, WashingType } from "@/service/machineService";
import MachineUsageView from "./MachineUsageView";
import AvailableMachineView from "./AvailableMachineView";
import FilterBar from "./FilterBar";

type MachineListProps = {
  data: { machine: Machine; washingType?: WashingType }[]; // Kết hợp Machine và WashingType
  refreshing?: boolean;
};

export const InUseMachineList: React.FC<MachineListProps> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.machine.id.toString()}
    renderItem={({ item }) => (
      <MachineUsageView timeRemaining={item.washingType?.defaultDuration ?? 0} {...item.machine} />
    )}
  />
);
type AvailableMachinesProps = {
  data: Machine[];
}


export const AvailableMachineList: React.FC<AvailableMachinesProps> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <AvailableMachineView {...item} />}
  />
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
