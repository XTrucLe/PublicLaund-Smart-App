import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Machine,
  MachineData,
  MachineUsage,
  WashingType,
} from "@/service/machineService";
import MachineUsageView from "./MachineUsageView";
import AvailableMachineView from "./AvailableMachineView";
import { getDatabase, onChildChanged, ref } from "firebase/database";

type InUseMachinesProps = {
  data: MachineUsage[];
  refreshing: (status: any) => void;
};

export const InUseMachineList: React.FC<InUseMachinesProps> = ({
  data,
  refreshing,
}) => {
  useEffect(() => {
    const db = getDatabase();
    const DBref = ref(db, "WashingMachineList");

    const unsubscribe = onChildChanged(DBref, (snapshot) => {
      data.map((item) => {
        if (item?.secretId === snapshot.key) {
          refreshing(true);
          console.log("refreshing");
        }
      });
    });
  }, []);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MachineUsageView {...item} />}
    />
  );
};
type AvailableMachinesProps = {
  data: MachineData[];
};

export const AvailableMachineList: React.FC<AvailableMachinesProps> = ({
  data,
}) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <AvailableMachineView key={item.id} {...item} />}
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
