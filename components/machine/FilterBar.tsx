import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text, TextStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getMachineLocations, Location } from "@/service/LocationService";
import { MaterialIcons } from "@expo/vector-icons";

interface FilterProps {
  onFilterChange: (filters: { city?: string; district?: string; ward?: string; nameLocation?: string }) => void;
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
  const [selectedNameLocation, setSelectedNameLocation] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch locations and extract unique cities and locations
  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getMachineLocations();
      setLocations(response);

      const uniqueCities = Array.from(new Set(response.map((loc: Location) => loc.city))).filter(Boolean);
      setCities(uniqueCities as string[]);

      // Extract unique name locations
      const uniqueNameLocations = Array.from(new Set(response.map((loc: Location) => loc.name))).filter(Boolean);
      setNameLocationOptions(uniqueNameLocations as string[]);
    };

    fetchLocations();
  }, []);

  // Handle city change
  const handleCityChange = useCallback(
    (value: string) => {
      setSelectedCity(value);
      setSelectedDistrict(null); // Reset district and ward when city changes
      setSelectedWard(null);

      const cityDistricts = locations
        .filter((loc) => loc.city === value)
        .map((loc) => loc.district)
        .filter(Boolean);
      setDistricts(Array.from(new Set(cityDistricts)) as string[]);
      setWards([]);
      onFilterChange({ city: value });
    },
    [locations, onFilterChange]
  );

  // Handle district change
  const handleDistrictChange = useCallback(
    (value: string) => {
      setSelectedDistrict(value);
      setSelectedWard(null); // Reset ward when district changes

      const districtWards = locations
        .filter((loc) => loc.district === value)
        .map((loc) => loc.ward)
        .filter(Boolean);
      setWards(Array.from(new Set(districtWards)) as string[]);
      onFilterChange({ city: selectedCity || "", district: value });
    },
    [locations, onFilterChange, selectedCity]
  );

  // Handle ward change
  const handleWardChange = useCallback(
    (value: string) => {
      setSelectedWard(value);
      onFilterChange({ city: selectedCity || "", district: selectedDistrict || "", ward: value });
    },
    [onFilterChange, selectedCity, selectedDistrict]
  );

  // Handle name location change
  const handleNameLocationChange = (value: string) => {
    setSelectedNameLocation(value);
    onFilterChange({
      city: selectedCity || "",
      district: selectedDistrict || "",
      ward: selectedWard || "",
      nameLocation: value,
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
        <Text style={[styles.filterButtonText&& style]}>Lọc</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Bộ lọc</Text>

          {/* Name Location Dropdown */}
          {renderDropdown(
            "Chọn địa điểm",
            nameLocationOptions.map((nameLocation) => ({ label: nameLocation, value: nameLocation })),
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
            districts.length === 0
          )}

          {renderDropdown(
            "Chọn phường/xã",
            wards.map((ward) => ({ label: ward, value: ward })),
            selectedWard,
            handleWardChange,
            wards.length === 0
          )}

          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  filterButton: {
    width:100,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
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
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default FilterBar;
