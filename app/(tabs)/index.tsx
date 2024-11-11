import ReviewList from "@/components/card/listReviewCard";
import SupportScreen from "@/components/card/supportList";
import TimeCountdown from "@/components/clock/TimeCoundown";
import Toolbar from "@/components/items/toolBar";
import MachineCarousel from "@/components/machine/MachineCarousel";
import ReservedMachineView from "@/components/machine/MachineReservedView";
import MachineUsageView from "@/components/machine/MachineUsageView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useNotificationFirebase } from "@/hooks/useCreateNotification";
import React, { useEffect } from "react";
import { Button, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function HomeScreen() {
  const { createNotification, getNotifications, isLoading } = useNotificationFirebase();

  const handleCreateNotification = () => {
    const userId = 123; // Thay thế bằng userId thực tế
    const notification = {
      title: "New Message",
      message: "You have a new message",
    };
    createNotification(userId, notification.title, notification.message);
  };
  
  // useEffect()
  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView
      headerImage={<Image source={require('../../assets/images/home-image.png')} style={styles.image} />}
      headerBackgroundColor={{ light: 'white', dark: 'black' }}
    >
      <View style={styles.mainContent}>
        <View style={styles.toolbar}>
          <Toolbar/>
        </View>
        <MachineCarousel />
        <ReviewList/>
        <SupportScreen/>
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
    width: '100%',
    resizeMode: 'cover',
  },
  mainContent: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
  },
  toolbar: {
    height: 100,
    width: "90%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 8,
    marginTop: -50, // Đẩy toolbar lên trên một chút
    marginHorizontal: "5%",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5, // Thêm độ nổi cho toolbar
  },
});
