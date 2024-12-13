import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { getMachineLocations, Location } from "@/service/LocationService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@/components/navigation";

const MapScreen = () => {
  const [items, setItems] = useState<Location[]>([]);
  const navigation = useNavigation<NavigationProps<"Home">>();
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Thực hiện fetch dữ liệu từ server
        const response = await getMachineLocations();
        setItems(response);
      } catch (error) {
        // console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleGoWashing = () => {
    navigation.navigate("Machine", {
      screen: "MachineScreen",
      params: { nameLocation: selectedMarker?.name },
    });
  };

  const renderMarker = useCallback(() => {
    return items?.map((item) => (
      <Marker
        key={item.id} // Đảm bảo key là duy nhất
        coordinate={{ latitude: item?.lat, longitude: item?.lng }}
        title={item.name}
        onPress={() => setSelectedMarker(item)}
      >
        <Callout style={styles.calloutContainer}>
          <Text style={styles.markerTitle}>{item.name}</Text>
          <View style={styles.calloutContent}>
            <Text>Địa chỉ: {item.address || "Không có địa chỉ"}</Text>
            <Text>Phường: {item.ward || "Không có phường"}</Text>
            <Text>Quận: {item.district || "Không có quận"}</Text>
            <Text>Thành Phố: {item.city || "Không có thành phố"}</Text>
            <Text>Số lượng máy giặt: {item.machineCount}</Text>
          </View>
        </Callout>
      </Marker>
    ));
  }, [items]);

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
        showsMyLocationButton={true}
      >
        {renderMarker()}
      </MapView>
      {selectedMarker && (
        <View style={{ padding: 10 }}>
          <Button title="Đi đến" onPress={handleGoWashing} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flexGrow: 1,
  },
  calloutContainer: {
    padding: 15,
    width: 250,
    backgroundColor: "#fff", // Màu nền trắng cho callout
    borderRadius: 10, // Làm tròn các góc của callout
    borderWidth: 1, // Thêm border cho callout
    borderColor: "#ddd", // Màu sắc cho border
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Vị trí bóng
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 5, // Độ lan tỏa bóng
    elevation: 5, // Để tạo bóng trên Android
  },
  markerTitle: {
    fontSize: 18, // Kích thước chữ lớn hơn để dễ nhìn
    fontWeight: "bold", // Chữ đậm
    textAlign: "center",
    marginBottom: 10, // Khoảng cách giữa title và nội dung
    color: "#333", // Màu chữ tối cho title
  },
  calloutContent: {
    paddingVertical: 8,
    fontSize: 14, // Kích thước chữ nhỏ hơn để phân biệt với title
    lineHeight: 20, // Để tạo khoảng cách giữa các dòng
    color: "#555", // Màu chữ nhạt hơn cho nội dung
  },
  calloutText: {
    marginBottom: 5, // Khoảng cách giữa các dòng
  },
  button: {
    backgroundColor: "#007bff", // Màu nền cho button
    padding: 10,
    borderRadius: 8, // Làm tròn các góc button
    marginTop: 10, // Khoảng cách từ thông tin tới button
  },
  buttonText: {
    color: "#fff", // Màu chữ của button
    textAlign: "center", // Căn giữa chữ trong button
    fontWeight: "bold", // Chữ đậm
  },
});

export default MapScreen;
