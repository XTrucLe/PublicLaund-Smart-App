import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

type Selection = {
  selection: any;
  removeKey?: (key: string) => void;
};

const RenderSelection = ({ selection, removeKey }: Selection) => {
  // Chuyển đối tượng selection thành mảng các cặp key-value
  const selectionArray = Object.entries(selection)
    .filter(([key, value]) => value) // Lọc các giá trị không phải falsy (null, undefined, false, ...).
    .map(([key, value]) => ({ key, value })); // Chuyển đối tượng thành mảng các phần tử.

  const handleRemoveItem = (key: string) => {
    selection[key] = false; // Đặt giá trị thành false khi nhấn vào "X"
    console.log(selection); // Hiển thị selection sau khi thay đổi
    if (removeKey) removeKey(key); // Gọi hàm removeKey từ component cha
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectionArray}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{String(item.value)}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item.key)} // Xử lý khi nhấn vào "X"
            >
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5, // Khoảng cách giữa các item
  },
  itemContainer: {
    height: 27.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: "#4CAF50",
    marginHorizontal: 4,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 12,
    color: "#fff",
    marginRight: 5,
    fontWeight: "500",
  },
  removeButton: {
    backgroundColor: "#FF4C4C",
    borderRadius: 6,
    width: 12.5,
    height: 12.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  removeText: {
    color: "#fff",
    fontSize: 7,
    fontWeight: "bold",
  },
});

export default RenderSelection;
