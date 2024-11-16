import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProps, RouteProps } from "@/components/navigation";

type NoticeStatusProp = {
  navigation: NavigationProps<"NoticeStatus">;
  route: RouteProps<"NoticeStatus">;
};

const NoticeStatus = ({ navigation, route }: NoticeStatusProp) => {
  const { success, message } = route.params;
  const handlePress = () => {
    //reset trạng thái stack và di chuyển về home
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Biểu tượng thành công hoặc thất bại */}
      {success ? (
        <Ionicons
          name="checkmark-circle"
          size={100}
          color="#4CAF50"
          style={styles.icon}
        />
      ) : (
        <Ionicons
          name="close-circle"
          size={100}
          color="#f44336"
          style={styles.icon}
        />
      )}

      {/* Thông báo trạng thái */}
      <Text style={styles.title}>
        {success ? "Giao dịch hoàn thành!" : "Giao dịch thất bại!"}
      </Text>

      <Text style={styles.message}>
        {success
          ? "Quá trình đặt máy giặt hoàn tất. Vui lòng bắt đầu sử dụng máy giặt trong vòng 15 phút."
          :message}
      </Text>

      {/* Nút trở về */}
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? success
                ? "#388E3C"
                : "#D32F2F"
              : success
              ? "#4CAF50"
              : "#f44336",
          },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NoticeStatus;
