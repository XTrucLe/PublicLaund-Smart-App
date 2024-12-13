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
import {
  getmachineInUse,
  getMachineReversed,
  getMachines,
  MachineData,
  MachineUsage,
} from "@/service/machineService";
import {
  AvailableMachineList,
  InUseMachineList,
} from "@/components/machine/MachineList";
import ReservedMachineView from "@/components/machine/MachineReservedView";
import RenderSelection from "./../../../components/items/RenderSelection";
import { useRoute } from "@react-navigation/native";
import { RouteProps } from "@/components/navigation";
import { SkeletonLoading } from "./../../../components/loading/SkeletonLoading";

const MachineScreen = () => {
  const route = useRoute<RouteProps<"MachineScreen">>();
  const { nameLocation } = route?.params ?? { nameLocation: "" };
  const [refreshing, setRefreshing] = useState(false);
  const [availableMachines, setAvailableMachines] = useState<MachineData[]>([]);
  const [inUseMachines, setInUseMachines] = useState<MachineUsage[]>([]);
  const [reservedMachines, setReservedMachines] = useState<MachineUsage | null>(
    null
  );
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<{
    city?: string;
    district?: string;
    ward?: string;
    nameLocation?: string;
  }>({});

  const routes = useMemo(
    () => [
      { key: "available", title: "Khả dụng" },
      { key: "running", title: "Đang sử dụng" },
    ],
    []
  );

  const fetchMachineData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [machineList, inUseList, reservedList] = await Promise.allSettled([
        getMachines(),
        getmachineInUse(),
        getMachineReversed(),
      ]);

      const handleResult = (
        result: any,
        onSuccess: any,
        onError: any,
        fallbackValue = null
      ) => {
        if (result.status === "fulfilled") {
          onSuccess(result.value);
        } else {
          console.error(onError, result.reason);
          onSuccess(fallbackValue);
        }
      };

      handleResult(
        machineList,
        (value: MachineData[]) =>
          setAvailableMachines(
            value.filter(
              (machine: MachineData) =>
                machine.status.toLowerCase() === "available"
            )
          ),
        "Error fetching available machines:"
      );

      handleResult(
        inUseList,
        setInUseMachines,
        "Error fetching in-use machines:"
      );

      handleResult(
        reservedList,
        setReservedMachines,
        "Error fetching reserved machines:",
        null
      );
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchMachineData();
    setFilter((prev) => ({ ...prev, nameLocation }));
  }, [fetchMachineData]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  const handleFilterChange = (filters: {
    city?: string;
    district?: string;
    ward?: string;
    nameLocation?: string;
  }) => {
    setFilter((prev) => ({ ...prev, ...filters }));
  };

  const handleRemoveFilter = (key: string) => {
    setFilter((prev) => ({ ...prev, [key]: undefined }));
  };

  const AvailableMachines = () => (
    <View style={styles.scene}>
      <View style={styles.filterContainer}>
        <FilterBar
          onFilterChange={handleFilterChange}
          style={styles.filterBar}
        />
        <View style={{ flex: 1 }}>
          {RenderSelection({
            selection: filter,
            removeKey: handleRemoveFilter,
          })}
        </View>
      </View>
      {refreshing ? (
        <SkeletonLoading direction="column" numOfChilds={5} />
      ) : availableMachines.length > 0 ? (
        <AvailableMachineList
          data={availableMachines.filter(
            (machine) =>
              // Lọc theo city nếu có
              (!filter.city ||
                machine.locationCity
                  .toLowerCase()
                  .includes(filter.city.toLowerCase())) &&
              // Lọc theo district nếu có
              (!filter.district ||
                machine.locationDistrict
                  .toLowerCase()
                  .includes(filter.district.toLowerCase())) &&
              // Lọc theo ward nếu có
              (!filter.ward ||
                machine.locationWard
                  .toLowerCase()
                  .includes(filter.ward.toLowerCase())) &&
              // Lọc theo nameLocation nếu có
              (!filter.nameLocation ||
                machine.locationName
                  .toLowerCase()
                  .includes(filter.nameLocation.toLowerCase()))
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
        <RefreshControl refreshing={refreshing} onRefresh={fetchMachineData} />
      }
    >
      {reservedMachines != null ? (
        <View style={styles.section}>
          <Text style={styles.header}>Máy đã đặt</Text>
          <View style={styles.separator} />
          <ReservedMachineView
            {...reservedMachines}
            refresh={fetchMachineData}
          />
        </View>
      ) : (
        <></>
      )}

      {/* In-use Machines Section */}
      <View style={styles.section}>
        {inUseMachines.length > 0 ? (
          <>
            <Text style={styles.header}>In-use</Text>
            <View style={styles.separator} />
            <InUseMachineList data={inUseMachines} />
          </>
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
    backgroundColor: "#62b7de",
  },
  tabLabel: {
    color: "white",
    fontWeight: "bold",
  },
  tabIndicator: {
    backgroundColor: "blue",
  },
  section: {
    marginBottom: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    color: "#333",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  noDataText: {
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
  },
  filterContainer: {
    top: 0,
    height: 75,
    width: "100%",
    flexDirection: "row",
  },
  filterBar: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default MachineScreen;
