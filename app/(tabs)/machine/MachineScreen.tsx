import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FilterBar from "@/components/machine/FilterBar";
import { getmachineInUse, getMachines, Machine, WashingType } from "@/service/machineService";
import { AvailableMachineList, InUseMachineList } from "@/components/machine/MachineList";


const MachineScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [availableMachines, setAvailableMachines] = useState<Machine[]>([]);
  const [inUseMachines, setInUseMachines] = useState<(Machine & WashingType)[]>([]);
  const [index, setIndex] = useState(0); 
  const [filter, setFilter] = useState("");

  const routes = useMemo(() => [
    { key: "available", title: "Available" },
    { key: "running", title: "In-use" },
  ], []);

  const fetchMachineData = useCallback(async () => {
    try {
      const [machineList, inUseList] = await Promise.all([
        getMachines(),
        getmachineInUse(1),
      ]);
      setAvailableMachines(machineList.filter((machine: Machine) => machine.status.toLowerCase() === "available"));
      setInUseMachines(inUseList);
    } catch (error) {
      console.error("Error fetching machine data:", error);
      // Có thể hiển thị thông báo cho người dùng ở đây
    }
  }, []);

  const handleFetchMachines = useCallback(async () => {
    setRefreshing(true);
    await fetchMachineData();
    setRefreshing(false);
  }, [fetchMachineData]);

  useEffect(() => {
    handleFetchMachines();
  }, [handleFetchMachines]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  const AvailableMachines = () => (
    <View style={styles.scene}>
      <FilterBar onFilterChange={setFilter} />
      {availableMachines.length > 0 ? (
        <AvailableMachineList
          data={availableMachines.filter(machine =>
            machine.locationName.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      ) : (
        <Text style={styles.noDataText}>Không có máy khả dụng.</Text>
      )}
    </View>
  );

  const RunningMachines = () => (
    <SafeAreaView style={styles.scene}>
      {inUseMachines.length > 0 ? (
        <InUseMachineList 
          data={inUseMachines.map(machine => ({ machine }))}
          refreshing={refreshing} 
        />
      ) : (
        <Text style={styles.noDataText}>Không có máy nào đang sử dụng.</Text>
      )}
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          available: AvailableMachines,
          running: RunningMachines,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "cyan",
  },
  tabLabel: {
    color: "black",
  },
  tabIndicator: {
    backgroundColor: "blue",
  },
  noDataText: {
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
  },
});

export default MachineScreen;
