import { View } from "react-native";
import React from "react";
import TimeCountdown from "@/components/clock/TimeCoundown";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TimeCountdown duration={90} />
    </View>
  );
}
