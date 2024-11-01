import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  imageUri?: string;
}

const HeaderWellcome: React.FC<HeaderProps> = ({ imageUri = "" }) => (
  <View style={styles.header}>
    <View style={styles.container}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>N</Text>
        </View>
      )}
    </View>
    <Text style={styles.welcomeText}>Chào mừng Máy Giặt!</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingTop: 32,
    paddingBottom:4,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingBottom: 0,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholder: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HeaderWellcome;