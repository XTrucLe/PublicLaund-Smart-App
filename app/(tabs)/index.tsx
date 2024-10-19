import { Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import TimeCountdown from "@/components/clock/TimeCoundown";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TimeCountdown duration={90} />
    </View>
  );
}
