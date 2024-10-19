import FilterBar from "@/components/machine/FilterBar";
import MachineList from "@/components/machine/MachineList";
import {
  getmachineInUse,
  getMachines,
  Machine,
} from "@/service/machineService";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

type Route = {
  key: string;
  title: string;
};

export default function MachineScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [availableMachines, setAvailableMachines] = useState<Machine[]>([]);
  const [inUseMachines, setInUseMachines] = useState<Machine[]>([]);
  const [index, setIndex] = useState(0); // Tab index
  const [routes] = useState<Route[]>([
    { key: "available", title: "Available" },
    { key: "running", title: "In-use" },
  ]);

  const [filter, setFilter] = useState("");

  // Hàm lấy danh sách máy giặt và máy đang sử dụng
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

  // Hàm xử lý cập nhật danh sách máy
  const updateMachineLists = (machineList: Machine[], inUseList: Machine[]) => {
    setMachines(machineList); // Cập nhật danh sách máy giặt
    setInUseMachines(inUseList); // Cập nhật danh sách máy đang sử dụng
    const availableMachines = machineList.filter(
      (machine: Machine) => machine.status.toLowerCase() === "available"
    );
    setAvailableMachines(availableMachines); // Cập nhật danh sách máy có sẵn
  };

  // Hàm gọi chính và set trạng thái refresh
  const handleFetchMachines = async () => {
    setRefreshing(true); // Bắt đầu refresh
    try {
      const { machineList, inUseList } = await fetchMachineData();
      updateMachineLists(machineList, inUseList);
    } catch (error) {
      console.error("Error handling machine fetch:", error);
    } finally {
      setRefreshing(false); // Kết thúc refresh
    }
  };

  // useEffect
  useEffect(() => {
    handleFetchMachines();
  }, []);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "blue" }}
      style={{ backgroundColor: "cyan" }}
      labelStyle={{ color: "black" }}
      getLabelText={({ route }) => route.title}
    />
  );

  // Hàm để render các tab
  const AvailableMachines = () => (
    <View style={{ flex: 1 }}>
      <FilterBar
        onFilterChange={(value: string) => {
          setFilter(value);
        }}
      />
      <MachineList
        data={availableMachines.filter((machine) =>
          machine.locationName.toLowerCase().includes(filter.toLowerCase())
        )}
        refreshing={refreshing}
      />
    </View>
  );

  const RunningMachines = () => (
    <MachineList data={inUseMachines} refreshing={refreshing} />
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
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
