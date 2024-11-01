import { getMachineLocations } from "@/service/LocationService";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface FilterBarProps {
  onFilterChange: (value: string) => void;
}

const FilterBar = React.memo(({ onFilterChange }: FilterBarProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState<{ label: string; value: string }[]>([
    { label: "Tất cả", value: "" }
  ]);

  useEffect(() => {
    const getFieldValue = async () => {
      const response = await getMachineLocations();
      const newData = response
        ? response.map((item: any) => ({ label: item.name, value: item.name }))
        : [];
      setData((prevData) => [...prevData, ...newData]);
    };
    getFieldValue();
  }, []);

  const dropdownPlaceholder = useMemo(
    () => (selectedValue ? selectedValue : "Chọn khu vực"),
    [selectedValue]
  );

  const handleDropdownChange = useCallback(
    (item: any) => {
      setSelectedValue(item.value);
      onFilterChange(item.value);
    },
    [onFilterChange]
  );

  return (
    <View style={styles.container}>
      <Dropdown
        placeholder={dropdownPlaceholder}
        labelField="label"
        valueField="value"
        maxHeight={200}
        data={data}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleDropdownChange}
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    width: "35%",
    minWidth: 100,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default FilterBar;
