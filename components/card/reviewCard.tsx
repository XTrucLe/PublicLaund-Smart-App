import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface ReviewCardProps {
  avatar?: string;
  username?: string;
  rating?: number;
  comment?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar = "https://example.com/default-avatar.png", // Avatar mặc định
  username = "Anonymous", // Tên mặc định
  rating = 0, // Xếp hạng mặc định là 0
  comment = "No comments available", // Bình luận mặc định
}) => {
  // Render các icon sao
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Nếu rating lớn hơn hoặc bằng i, hiển thị sao đầy
      if (i <= Math.floor(rating)) {
        stars.push(
          <FontAwesome
            key={i}
            name="star"
            size={16}
            color="#FFD700" // Màu vàng cho sao
            style={styles.star}
          />
        );
      }
      // Nếu rating có phần thập phân và nằm ở vị trí hiện tại, hiển thị nửa sao
      else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <FontAwesome
            key={i}
            name="star-half-full"
            size={16}
            color="#FFD700"
            style={styles.star}
          />
        );
      }
      // Nếu không, hiển thị sao trống
      else {
        stars.push(
          <FontAwesome
            key={i}
            name="star-o"
            size={16}
            color="#FFD700"
            style={styles.star}
          />
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
      <View style={styles.starContainer}>{renderStars()}</View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    padding: 16,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  star: {
    marginHorizontal: 2,
  },
  comment: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
});

export default ReviewCard;
