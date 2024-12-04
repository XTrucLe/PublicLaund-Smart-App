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
    paddingHorizontal: 10,
  },
  itemContainer: {
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#4CAF50", // Màu xanh lá cây đẹp mắt
    marginHorizontal: 8,
    borderRadius: 8,
    shadowColor: "#000", // Thêm bóng đổ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "#fff", // Chữ trắng để dễ nhìn
    marginRight: 10,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#FF4C4C", // Màu đỏ nổi bật
    borderRadius: 12,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RenderSelection;
