import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface WalletActionProps {
  iconType: "Ionicons" | "MaterialIcons";
  iconName: any;
  iconColor: string;
  actionText: string;
  circleIconName?: any;
  circleIconColor?: string;
  onPress: () => void;
}

const WalletAction: React.FC<WalletActionProps> = ({
  iconType,
  iconName,
  iconColor,
  actionText,
  circleIconName,
  circleIconColor,
  onPress,
}) => {
  const renderIcon = () => {
    if (iconType === "Ionicons") {
      return (
        <>
          <Ionicons name={iconName} size={22} color={iconColor} />
          {circleIconName && (
            <Ionicons
              name={circleIconName}
              size={14}
              color={circleIconColor}
              style={styles.itemcircle}
            />
          )}
        </>
      );
    } else if (iconType === "MaterialIcons") {
      return (
        <>
          <MaterialIcons name={iconName} size={22} color={iconColor} />
          {circleIconName && (
            <MaterialIcons
              name={circleIconName}
              size={14}
              color={circleIconColor}
              style={styles.itemcircle}
            />
          )}
        </>
      );
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <Text style={styles.text}>{actionText}</Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "space-around",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 2,
  },
  iconContainer: {
    position: "relative",
    padding: 10,
    borderColor: "#30374b",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
  },
  itemcircle: {
    position: "absolute",
    right: 4,
    bottom: 6,
  },
  text: {
    marginTop: 2,
    marginLeft: 2,
    fontSize: 14,
  },
});

export default WalletAction;
