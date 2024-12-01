import ReviewList from "@/components/card/listReviewCard";
import SupportScreen from "@/components/card/supportList";
import Toolbar from "@/components/items/toolBar";
import MachineCarousel from "@/components/machine/MachineCarousel";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { View } from "react-native";
import { fetchAndStoreUserInfo, useUserInfo } from "@/service/authService";
import { useNotifications } from "@/hooks/usePushNotification";
import { getNumberUsingByMonth, getTotalRevenue } from "@/service/OwnerService";

export default function HomeScreen() {
  fetchAndStoreUserInfo();
  useUserInfo();
  const { deviceInfo, userId } = useNotifications();
  useEffect(() => {
    getNumberUsingByMonth(3);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require("../../../assets/images/home-image.png")}
            style={styles.image}
          />
        }
        headerBackgroundColor={{ light: "white", dark: "black" }}
      >
        <View style={styles.mainContent}>
          <View style={styles.toolbar}>
            <Toolbar />
          </View>
          <MachineCarousel />
          <ReviewList />
          <SupportScreen />
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  mainContent: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
  },
  toolbar: {
    height: 90,
    width: "90%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -50, // Đẩy toolbar lên trên một chút
    marginHorizontal: "5%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    overflow: "hidden",
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5, // Thêm độ nổi cho toolbar
  },
});
