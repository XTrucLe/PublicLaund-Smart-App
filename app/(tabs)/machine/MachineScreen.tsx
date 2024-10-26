import React, { useEffect, useState } from "react";
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

type Route = {
  key: string;
  title: string;
};

const MachineScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [availableMachines, setAvailableMachines] = useState<Machine[]>([]);
  const [inUseMachines, setInUseMachines] = useState<(Machine & WashingType)[]>([]);
  const [index, setIndex] = useState(0); 
  const [filter, setFilter] = useState("");

  // Định nghĩa các route cho TabView
  const routes: Route[] = [
    { key: "available", title: "Available" },
    { key: "running", title: "In-use" },
  ];

  // Hàm lấy dữ liệu máy
  const fetchMachineData = async () => {
    try {
      // Sử dụng Promise.all để lấy danh sách máy và máy đang sử dụng song song
      const [machineList, inUseList] = await Promise.all([
        getMachines(),
        getmachineInUse(1),
      ]);
      // Cập nhật danh sách máy khả dụng và máy đang sử dụng
      setAvailableMachines(machineList.filter((machine: { status: string; }) => machine.status.toLowerCase() === "available"));
      setInUseMachines(inUseList);
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };

  // Hàm xử lý việc lấy dữ liệu máy
  const handleFetchMachines = async () => {
    setRefreshing(true); // Bắt đầu làm mới dữ liệu
    await fetchMachineData(); // Lấy dữ liệu máy
    setRefreshing(false); // Kết thúc làm mới dữ liệu
  };

  // Fetch data on component mount
  useEffect(() => {
    handleFetchMachines(); // Gọi hàm lấy dữ liệu khi component được mount
  }, []);

  // Render tab bar cho TabView
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  // Render danh sách máy khả dụng
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

  // Render danh sách máy đang sử dụng
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
        navigationState={{ index, routes }} // Trạng thái điều hướng
        renderScene={SceneMap({
          available: AvailableMachines,
          running: RunningMachines,
        })}
        onIndexChange={setIndex} // Cập nhật index khi thay đổi tab
        initialLayout={{ width: Dimensions.get("window").width }} // Layout ban đầu cho tab
        renderTabBar={renderTabBar} // Render tab bar
      />
    </SafeAreaView>
  );
};

// Các kiểu dáng cho component
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
