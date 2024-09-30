import MachineView from "@/components/container/washingMachine";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is machine layout</Text>
      <ScrollView style={styles.viewContainer}>
        <MachineView machineNumber={1} status="on"></MachineView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 16,
  },
});
