import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getWashingTypes, washingType } from "@/service/machineService";
import LaundryOption from "@/components/items/machineOption";
import { NavigationProps, RouteProps } from "@/components/navigation";

type Props = {
  navigation: NavigationProps<"OptionsScreen">;
  route: RouteProps<"OptionsScreen">;
};

function OptionLaundry({ navigation, route }: Props) {
  const { id } = route.params;
  const [washingTypes, setWashingTypes] = useState<washingType[]>([]);
  const [selectedLaundry, setSelectedLaundry] = useState<washingType | null>(
    null
  );

  useEffect(() => {
    // Lấy danh sách loại đồ giặt
    const fetchWashingTypes = async () => {
      const data = await getWashingTypes();
      console.log(data);
      
      setWashingTypes(data);
    };
    fetchWashingTypes();    
  }, []);

  const handleSelect = (item: washingType) => {
    setSelectedLaundry(item);
    console.log(item);
  };

  const handleNext = () => {
    if (!selectedLaundry) {
      return alert("Vui lòng chọn loại đồ giặt trước khi tiếp tục.");
    }
    navigation.navigate("ConfirmScreen", {
      id: id,
      washingType: selectedLaundry,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Máy giặt số {id}</Text>
      </View>
      <Text style={styles.title}>Chọn loại đồ giặt:</Text>
      {washingTypes.map((item) => (        
        <LaundryOption
          key={item.id}
          name={item.typeName}
          onSelect={() => handleSelect(item)}
          isSelected={item.id === selectedLaundry?.id}
        />
      ))}
      <Pressable onPress={handleNext} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Next</Text>
        <Ionicons
          name="arrow-forward"
          size={16}
          color="#fff"
          style={styles.icon}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#4caf50", // Màu nền của nút
    paddingVertical: 10, // Độ dày của nút
    paddingHorizontal: 20, // Độ rộng của nút
    borderRadius: 20, // Bo góc nút
    alignSelf: "flex-end", // Đặt nút bên phải
    marginTop: 20, // Khoảng cách trên của nút
    shadowColor: "#000", // Thêm shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // Độ nổi (Android)
  },
  buttonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Chữ đậm
    textAlign: "center", // Căn giữa chữ trong nút
  },
  icon: {
    marginLeft: 8,
    marginTop: 1,
  },
});

export default OptionLaundry;
