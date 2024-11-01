import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export interface SupportTask {
  icon: string;
  title: string;
  description: string;
  action: () => void;
}

interface SupportTaskCardProps {
  item: SupportTask;
  onPress: (action: () => void) => void;
}

const SupportTaskCard: React.FC<SupportTaskCardProps> = React.memo(({ item, onPress }) => {
  const IconComponent = item.icon === "headset" ? MaterialIcons : FontAwesome;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item.action)}
      accessible={true}
      accessibilityLabel={item.title}
      activeOpacity={0.7}
    >
      <IconComponent
        name={item.icon as any}
        size={24}
        color="#4a90e2"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default SupportTaskCard;
