import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const images = ['1', '2', '3', '4'];

const swiperImage = () => (
  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      autoplayLoop
      index={2}
      data={images}
      renderItem={({ item }) => (
          <Image
				style={styles.images}
				source={require('../assets/registerimage.jpg')}/>
      )}
    />
  </View>
);

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  images: {
    marginTop: screen.height * 0.02,
    width: screen.width,
    height: screen.height * 0.20,
    marginBottom: 20
  },
});

export default swiperImage;