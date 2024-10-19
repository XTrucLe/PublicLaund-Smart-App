import React from "react";
import Svg, { Ellipse, ClipPath, Defs, Rect } from "react-native-svg";
import { View, StyleSheet } from "react-native";

interface CurvedBackgroundProps {
  height?: number; // Thay đổi chiều cao nếu cần
  children?: React.ReactNode; // Thêm children vào props
}

const CurvedBackground: React.FC<CurvedBackgroundProps> = ({ height = 200, children }) => {
  return (
    <View style={{ height, overflow: "hidden" }}>
      <Svg height={height} width="100%">
        <Defs>
          <ClipPath id="clip">
            <Ellipse cx="50%" cy="0" rx="100%" ry="100%" />
          </ClipPath>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="cyan"
          clipPath="url(#clip)"
        />
      </Svg>
      <View style={styles.childrenContainer}>
        {children} 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Đảm bảo các child components nằm trên nền
  },
});

export default CurvedBackground;
