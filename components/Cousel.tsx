import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { title: 'Slide 1', image: 'https://via.placeholder.com/600x400.png?text=Slide+1' },
  { title: 'Slide 2', image: 'https://via.placeholder.com/600x400.png?text=Slide+2' },
  { title: 'Slide 3', image: 'https://via.placeholder.com/600x400.png?text=Slide+3' },
];

const SlideShow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }: { item: { title: string; image: string } }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      autoplay={true}
      loop={true}
      onSnapToItem={(index) => setActiveIndex(index)}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: 400,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SlideShow;
