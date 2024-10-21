import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FilterBar from "@/components/machine/FilterBar";
import MachineList from "@/components/machine/MachineList";
import {
  getmachineInUse,
  getMachines,
  Machine,
} from "@/service/machineService";
import { reservationMachine } from "@/service/ReservationService";

type Route = {
  key: string;
  title: string;
};

const MachineScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [availableMachines, setAvailableMachines] = useState<Machine[]>([]);
  const [inUseMachines, setInUseMachines] = useState<Machine[]>([]);
  const [reservedMachine, setReservedMachine] = useState<Machine[]>([]);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("");

  const routes: Route[] = [
    { key: "available", title: "Available" },
    { key: "running", title: "In-use" },
  ];

  // Fetch machine data
  const fetchMachineData = async () => {
    try {
      const [machineList, inUseList] = await Promise.all([
        getMachines(),
        getmachineInUse(1),
      ]);
      return { machineList, inUseList };
    } catch (error) {
      console.error("Error fetching machine data:", error);
      throw error;
    }
  };

  // Update machine lists
  const updateMachineLists = (machineList: Machine[], inUseList: Machine[]) => {
    setMachines(machineList);
    setInUseMachines(inUseList);
    setAvailableMachines(
      machineList.filter(
        (machine) => machine.status.toLowerCase() === "available"
      )
    );
  };

  // Handle machine fetching
  const handleFetchMachines = async () => {
    setRefreshing(true);
    try {
      const { machineList, inUseList } = await fetchMachineData();
      updateMachineLists(machineList, inUseList);
    } catch (error) {
      console.error("Error handling machine fetch:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    handleFetchMachines();
  }, []);

  // Render tab bar
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  // Render available machines
  const AvailableMachines = () => (
    <View style={styles.scene}>
      <FilterBar onFilterChange={setFilter} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleFetchMachines}
          />
        }
      >
        <MachineList
          data={availableMachines.filter((machine) =>
            machine.locationName.toLowerCase().includes(filter.toLowerCase())
          )}
          refreshing={refreshing}
        />
      </ScrollView>
    </View>
  );

  // Render running machines
  const RunningMachines = () => (
    <SafeAreaView style={styles.scene}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleFetchMachines}
          />
        }
        style={{ flex: 1, paddingVertical: 10 }}
      >
        {reservedMachine && reservedMachine.length > 0 ? (
          <>
            <MachineList data={reservedMachine} refreshing={refreshing} />
            <View style={styles.divider} />
          </>
        ) : null}

        {/* Kiểm tra danh sách máy đang sử dụng */}
        {inUseMachines && inUseMachines.length > 0 ? (
          <MachineList data={inUseMachines} refreshing={refreshing} />
        ) : null}

        {(!reservedMachine || reservedMachine.length === 0) &&
          (!inUseMachines || inUseMachines.length === 0) && (
            <Text style={styles.noDataText}>
              Không có máy nào đã được đặt.
            </Text>
          )}
      </ScrollView>
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
  divider: {
    height: 1,
    backgroundColor: "#cccccc", // Màu sắc của thanh phân cách
    marginVertical: 10, // Khoảng cách trên và dưới
  },
  noDataText: {
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
  },
});

export default MachineScreen;
