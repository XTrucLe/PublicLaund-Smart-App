import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  TextStyle,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getMachineLocations, Location } from "@/service/LocationService";
import { MaterialIcons } from "@expo/vector-icons";

interface FilterProps {
  onFilterChange: (filters: {
    city?: string;
    district?: string;
    ward?: string;
    nameLocation?: string;
  }) => void;
  style?: TextStyle;
}

const FilterBar: React.FC<FilterProps> = ({ onFilterChange, style }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const [nameLocationOptions, setNameLocationOptions] = useState<string[]>([]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [selectedNameLocation, setSelectedNameLocation] = useState<
    string | null
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch data từ API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getMachineLocations();
        setLocations(response);

        // Lấy danh sách unique
        const unique = (key: keyof Location) =>
          Array.from(
            new Set(response.map((loc: { [x: string]: any }) => loc[key]))
          ).filter(Boolean);
        setCities(unique("city") as string[]);
        setNameLocationOptions(unique("name") as string[]);
        setDistricts(unique("district") as string[]);
        setWards(unique("ward") as string[]);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Xử lý chọn thành phố
  const handleCityChange = useCallback(
    (value: string) => {
      setSelectedCity(value);
      setSelectedDistrict(null);
      setSelectedWard(null);

      const cityDistricts = locations
        .filter((loc) => loc.city === value)
        .map((loc) => loc.district);
      setDistricts(
        Array.from(
          new Set(cityDistricts.filter((district) => district !== null))
        )
      );
      setWards([]);
    },
    [locations, onFilterChange]
  );

  // Xử lý chọn quận/huyện
  const handleDistrictChange = useCallback(
    (value: string) => {
      setSelectedDistrict(value);
      setSelectedWard(null);

      const districtWards = locations
        .filter((loc) => loc.district === value)
        .map((loc) => loc.ward);
      setWards([...new Set(districtWards.filter((ward) => ward !== null))]);
    },
    [locations, onFilterChange, selectedCity]
  );

  // Xử lý chọn phường/xã
  const handleWardChange = useCallback(
    (value: string) => {
      setSelectedWard(value);
    },
    [onFilterChange, selectedCity, selectedDistrict]
  );

  // Xử lý chọn địa điểm
  const handleNameLocationChange = useCallback(
    (value: string) => {
      setSelectedNameLocation(value);
      onFilterChange({
        city: selectedCity || "",
        district: selectedDistrict || "",
        ward: selectedWard || "",
        nameLocation: value,
      });
    },
    [onFilterChange, selectedCity, selectedDistrict, selectedWard]
  );

  const handleApplyFilter = () => {
    onFilterChange({
      city: selectedCity || "",
      district: selectedDistrict || "",
      ward: selectedWard || "",
      nameLocation: selectedNameLocation || "",
    });
  };
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  // Render a single dropdown
  const renderDropdown = (
    placeholder: string,
    data: { label: string; value: string }[],
    value: string | null,
    onChange: (value: string) => void,
    isDisabled: boolean = false
  ) => (
    <Dropdown
      labelField="label"
      valueField="value"
      style={[styles.dropdown, isDisabled && styles.disabledDropdown]}
      data={data}
      placeholder={placeholder}
      value={value}
      minHeight={100}
      maxHeight={300}
      onChange={(item) => onChange(item.value)}
      disable={isDisabled}
      selectedTextStyle={styles.selectedText} // Style cho mục được chọn
      itemTextStyle={styles.itemText} // Style cho từng mục trong danh sách
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.filterButton}>
        <MaterialIcons name="filter-list" size={24} color="white" />
        <Text style={styles.filterButtonText}>Lọc</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bộ lọc</Text>

          {/* Name Location Dropdown */}
          {renderDropdown(
            "Chọn địa điểm",
            nameLocationOptions.map((nameLocation) => ({
              label: nameLocation,
              value: nameLocation,
            })),
            selectedNameLocation,
            handleNameLocationChange,
            nameLocationOptions.length === 0
          )}

          {renderDropdown(
            "Chọn thành phố",
            cities.map((city) => ({ label: city, value: city })),
            selectedCity,
            handleCityChange,
            cities.length === 0
          )}

          {renderDropdown(
            "Chọn quận/huyện",
            districts.map((district) => ({ label: district, value: district })),
            selectedDistrict,
            handleDistrictChange,
            districts.length === 0 || !selectedCity
          )}

          {renderDropdown(
            "Chọn phường/xã",
            wards.map((ward) => ({ label: ward, value: ward })),
            selectedWard,
            handleWardChange,
            wards.length === 0 || !selectedDistrict
          )}

          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Button title="Xác nhận" onPress={handleApplyFilter} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
  },
  filterButton: {
    width: 100,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginTop: 100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  dropdown: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  disabledDropdown: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#333",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    position: "absolute",
    right: 16,
    top: 16,
  },
  closeButtonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterBar;
