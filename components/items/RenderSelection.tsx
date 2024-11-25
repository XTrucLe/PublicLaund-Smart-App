import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";

const RenderSelection = ({ selection }: any) => {
  // Chuyển đối tượng selection thành mảng các cặp key-value
  const selectionArray = Object.entries(selection)
    .filter(([key, value]) => value) // Lọc các giá trị không phải falsy (null, undefined, false, ...)
    .map(([key, value]) => ({ key, value })); // Chuyển đối tượng thành mảng các phần tử

  const handleRemoveItem = (key: string) => {
    selection[key] = false; // Đặt giá trị thành false khi nhấn vào "X"
    console.log(selection); // Hiển thị selection sau khi thay đổi
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
    flex:1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    height:55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#ff5c5c",
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default RenderSelection;
