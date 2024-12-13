import { StyleSheet, View } from "react-native";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type SkeletonLoadingProps = {
  direction?: FlexDirection;
  numOfChilds?: number;
};

export const SkeletonLoading = ({
  direction = "row",
  numOfChilds = 3,
}: SkeletonLoadingProps) => (
  <View style={[styles.skeletonContainer, { flexDirection: direction }]}>
    {[...Array(numOfChilds)].map((_, index) => (
      <View key={index} style={styles.skeletonItem} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  skeletonItem: {
    width: 350,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
