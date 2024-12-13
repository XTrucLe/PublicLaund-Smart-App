import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SupportTaskCard, { SupportTask } from "./supportCard";

const supportTasks: any[] = [
  {
    id: "1",
    title: "Hướng dẫn sử dụng",
    description: "Tìm hiểu cách sử dụng ứng dụng một cách hiệu quả.",
    icon: "book",
    action: "navigateToGuide",
  },
  {
    id: "2",
    title: "Tin tức và cập nhật",
    description: "Cập nhật các phiên bản và tính năng mới nhất của ứng dụng.",
    icon: "newspaper-o",
    action: "navigateToNews",
  },
  {
    id: "3",
    title: "Hỗ trợ khách hàng",
    description: "Liên hệ với đội ngũ hỗ trợ khách hàng.",
    icon: "headset",
    action: "navigateToCustomerSupport",
  },
];

const SupportScreen = ({ navigation }: any) => {
  const handlePress = (action: any) => {
    switch (action) {
      case "navigateToGuide":
        navigation.navigate("Guide");
        break;
      case "navigateToNews":
        navigation.navigate("News");
        break;
      case "navigateToCustomerSupport":
        navigation.navigate("CustomerSupport");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hỗ trợ</Text>
      {supportTasks.map((item) => (
        <SupportTaskCard key={item.id} item={item} onPress={handlePress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
export default SupportScreen;
