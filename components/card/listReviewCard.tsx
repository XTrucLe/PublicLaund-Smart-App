import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ReviewCard from './reviewCard';

const reviews = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    username: 'John Doe',
    rating: 5,
    comment: 'Great service and clean machines!',
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    username: 'Jane Smith',
    rating: 4,
    comment: 'Good experience, would recommend!',
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    username: 'Mike Johnson',
    rating: 3,
    comment: 'Average service, but convenient.',
  },
  // Thêm nhiều đánh giá nếu cần
];

const ReviewList = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Đánh giá gần đây</Text>

      </View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewCard
            avatar={item.avatar}
            username={item.username}
            rating={item.rating}
            comment={item.comment}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 4,
  },
});

export default ReviewList;
