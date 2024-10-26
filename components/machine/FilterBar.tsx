import { getMachineLocations } from "@/service/LocationService";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const FilterBar = ({ onFilterChange }: any) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // Dùng null để dễ phân biệt
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState<{label: string, value:string}[]>([
    { label: "Tất cả", value: "" }
  ]);

  useEffect(() => {
    const getFieldValue = async () => {
      const data = await getMachineLocations();
      const newData= data? data.map((item: any) => {
        return { label: item.name, value: item.name };
      }): [];
      setData((prevData) => [...prevData, ...newData]);
    }
    getFieldValue();
  }, []);
  return (
    <View style={styles.container}>
      <Dropdown
        placeholder={selectedValue ? selectedValue : "Chọn khu vực"}
        labelField="label"
        valueField="value"
        maxHeight={200}
        data={data}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedValue(item.value);
          onFilterChange(item.value);
        }}
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      />
    </View>
  );
};

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
