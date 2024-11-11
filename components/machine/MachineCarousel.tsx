import { View, Text, Dimensions, StyleSheet, FlatList, Button } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { getAvailableMachines, Machine } from "@/service/machineService";
import AvailableMachineView from "./AvailableMachineView";
import { NavigationProps } from '@/components/navigation';
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const MachineCarousel = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps<"Home">>();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const machinesData = await getAvailableMachines();
        setMachines(machinesData || []); // Ensure `machines` is always an array
      } catch (error) {
        console.error("Failed to fetch machines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  // Sử dụng useMemo để lưu trữ 6 máy đầu tiên, chỉ cập nhật khi machines thay đổi
  const displayedMachines = useMemo(() => machines.slice(0, 6), [machines]);

  const renderItem = ({ item }: { item: Machine }) => {
    return item ? (
      <View style={styles.item}>
        <AvailableMachineView {...item} />
      </View>
    ) : null;
  };  

  const handleShowAll = () => {
    navigation.navigate("MachineScreen")
  };

  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <Text>Đang tải máy giặt...</Text>
      </View>
    );
  }

  if (machines.length === 0) {
    return (
      <View style={styles.loadingIndicator}>
        <Text>Không có máy giặt nào.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách máy giặt</Text>
        <Button title="Xem toàn bộ" onPress={handleShowAll} />
      </View>
      <FlatList
        data={displayedMachines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        contentContainerStyle={styles.carouselContainer}
        decelerationRate="fast"
        snapToInterval={width * 0.87}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  carouselContainer: {
    flexGrow: 1,
    maxHeight: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  item: {
    width: width * 0.85,
    marginHorizontal: 10,
    marginLeft: 16,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MachineCarousel;
