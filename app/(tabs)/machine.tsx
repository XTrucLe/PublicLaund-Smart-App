import HeaderText from "@/src/container/theme/HeaderText";
import MachineView from "@/src/container/washing/washingMachine";
import { Machine, machineList } from "@/src/service/machineService";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MachineScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [machines, setMachines] = useState<Machine[]>([]);
  useEffect(() => {
    setMachines(machineList);
  });
  const onRefresh = () => {
    setRefreshing(true);
    // Giả lập việc tải lại dữ liệu
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Giả lập thời gian tải dữ liệu
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.machineListView}>
        <HeaderText text="Machine List:" />
        <FlatList
          data={machines}
          keyExtractor={(item) => item.machineNumber.toString()}
          renderItem={({ item }) => (
            <MachineView
              machineNumber={item.machineNumber}
              status={item.status}
            />
          )}
          // numColumns={1} // Hiển thị 2 cột
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
  machineListView: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    paddingTop: 8
  },

});
