import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const registerimage = require('../assets/registerimage.jpg');
const hospital = require('../assets/hospital.jpg');

const newImage = [registerimage, hospital];
const image = (index) => ({ image: newImage[index % newImage.length] });
const items = Array.from(Array(5)).map((_, index) => image(index));

const swiperImage = () => (
  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      autoplayLoop
      index={2}
      data={items}
      renderItem={({ item, index }) => (
          <Image
				style={styles.images}
				source={item.image}/>
      )}
    />
  </View>
);

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  images: {
    marginTop: screen.height * 0.02,
    width: screen.width - 10,
    height: screen.height * 0.20,
    marginBottom: 20,
  },
});

export default swiperImage;