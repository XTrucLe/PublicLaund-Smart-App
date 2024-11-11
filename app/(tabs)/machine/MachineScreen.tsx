import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FilterBar from "@/components/machine/FilterBar";
import { getmachineInUse, getMachineReversed, getMachines, Machine, MachineData, MachineUsage, } from "@/service/machineService";
import { AvailableMachineList, InUseMachineList } from "@/components/machine/MachineList";
import MachineUsageView from "@/components/machine/MachineUsageView";
import ReservedMachineView from "@/components/machine/MachineReservedView";


const MachineScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [availableMachines, setAvailableMachines] = useState<MachineData[]>([]);
  const [inUseMachines, setInUseMachines] = useState<MachineUsage[]>(
    []
  );
  const [reservedMachines, setReservedMachines] = useState<MachineUsage|null>();
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("");

  const routes = useMemo(
    () => [
      { key: "available", title: "Available" },
      { key: "running", title: "In-use" },
    ],
    []
  );

  const fetchMachineData = useCallback(async () => {
    try {
      let [machineList, inUseList, reservedList] = await Promise.allSettled([
        getMachines(),
        getmachineInUse(),
        getMachineReversed(),
      ]);

      if (machineList.status === "fulfilled" && machineList.value) {
        setAvailableMachines(
          machineList.value.filter(
            (machine: Machine) => machine.status.toLowerCase() === "available"
          )
        );
      } else {
        console.error("Error fetching available machines:", machineList.status);
      }

      if (inUseList.status === "fulfilled" && inUseList.value) {
        setInUseMachines(inUseList.value);
      } else {
        console.error("Error fetching in-use machines:", inUseList.status);
      }
      
      if (reservedList.status === "fulfilled" && reservedList.value) {
        setReservedMachines(reservedList.value);
      } else {
        console.error("Error fetching reserved machines:", reservedList.status);
      } 

    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  }, []);

  useEffect(() => {
    fetchMachineData();
  }, [fetchMachineData]);


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
    <ScrollView
      style={styles.scene}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchMachineData}
        />
      }
    >
      {reservedMachines && (
        <View style={styles.section}>
          <Text style={styles.header}>Reserved</Text>
          <View style={styles.separator} />
          <ReservedMachineView {...reservedMachines} />
        </View>
      )}

      {/* In-use Machines Section */}
      <View style={styles.section}>
        {inUseMachines.length > 0 ? (
       <>
        <Text style={styles.header}>In-use</Text>
        <View style={styles.separator} />
          <InUseMachineList data={inUseMachines} /></>
        ) : (
          <Text style={styles.noDataText}>Không có máy nào đang sử dụng.</Text>
        )}
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: "#333",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  noDataText: {
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
  },
});

export default MachineScreen;
