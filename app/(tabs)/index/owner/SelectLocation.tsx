import { NavigationProps, RouteProps } from "@/components/navigation";
import { getMachineLocations, Location } from "@/service/LocationService";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const SelectLocationScreen = () => {
  const navigation = useNavigation<NavigationProps<"SelectLocationScreen">>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Thực hiện fetch dữ liệu từ server
        const response = await getMachineLocations();
        setLocations(response);
      } catch (error) {
        // console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      console.log("Location Selected:", selectedLocation);

      // Ví dụ: Chuyển về màn hình trước với dữ liệu vị trí
      navigation.goBack(); // Quay về màn hình trước
      navigation.navigate({
        name: "MachineDataScreen", // Tên màn hình trước
        params: { location: selectedLocation }, // Truyền location về
        merge: true, // Giữ nguyên các params khác (nếu có)
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 16.047079, // Vĩ độ của Đà Nẵng
          longitude: 108.20623, // Kinh độ của Đà Nẵng
          latitudeDelta: 0.0922, // Độ chia vĩ độ, điều chỉnh để zoom
          longitudeDelta: 0.0421, // Độ chia kinh độ, điều chỉnh để zoom
        }}
        onPress={handleMapPress} // Lắng nghe sự kiện nhấn trên bản đồ
      >
        {/* Hiển thị marker tại vị trí được chọn */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.lat,
              longitude: location.lng,
            }}
            title={location.name}
            onPress={() => setSelectedLocation(location)} // Chọn vị trí khi nhấn vào Marker
            pinColor={
              selectedLocation?.id === location.id ? "blue" : "red" // Đánh dấu màu của Marker được chọn
            }
          />
        ))}
      </MapView>

      {/* Nút xác nhận */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedLocation && { backgroundColor: "#ccc" }, // Vô hiệu hóa nút khi chưa chọn
          ]}
          onPress={handleConfirmLocation}
          disabled={!selectedLocation}
        >
          <Text style={styles.buttonText}>Xác nhận vị trí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#007bff", // Màu nền
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SelectLocationScreen;
