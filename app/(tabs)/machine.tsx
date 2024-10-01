import MachineView from "@/components/container/washingMachine";
import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet} from "react-native";

const machines: { machineNumber: number; status: "running" | "available" | "maintenance"; }[] = [
  { machineNumber: 1, status: "running" },
  { machineNumber: 2, status: "available" },
  { machineNumber: 3, status: "available" },
  { machineNumber: 4, status: "maintenance" },
  { machineNumber: 5, status: "running" },
  { machineNumber: 6, status: "running" },
  { machineNumber: 7, status: "running" },
  { machineNumber: 8, status: "available" },
  { machineNumber: 9, status: "running" },
  { machineNumber: 10, status: "running" },
];

export default function MachineScreen() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Giả lập việc tải lại dữ liệu
        setTimeout(() => {
          setRefreshing(false);
        }, 2000); // Giả lập thời gian tải dữ liệu
      };
  return (
    <FlatList
      data={machines}
      keyExtractor={(item) => item.machineNumber.toString()}
      renderItem={({ item }) => (
        <MachineView machineNumber={item.machineNumber} status={item.status} />
      )}
      numColumns={2} // Hiển thị 2 cột
      contentContainerStyle={styles.viewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 8,
        justifyContent: 'space-between',
      },
      machineView: {
        flex: 1,
        margin: 10,
        backgroundColor: '#e0e0e0',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
});
