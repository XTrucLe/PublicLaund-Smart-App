import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Machine, MachineUsage, WashingType } from "@/service/machineService";
import MachineUsageView from "./MachineUsageView";
import AvailableMachineView from "./AvailableMachineView";

type InUseMachinesProps = {
  data: MachineUsage[];
};

export const InUseMachineList: React.FC<InUseMachinesProps> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <MachineUsageView {...item} />}
  />
);
type AvailableMachinesProps = {
  data: Machine[];
};

export const AvailableMachineList: React.FC<AvailableMachinesProps> = ({
  data,
}) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <AvailableMachineView
        locationCity={""}
        locationDistrict={""}
        locationWard={""}
        locationId={0}
        locationName={""}
        locationAddress={""}
        {...item}
      />
    )}
    style={styles.availableList}
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
  availableList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
