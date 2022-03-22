import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Title, Text} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {PATH_IMAGE_HOST} from '../constants/constants';
import React from 'react';

const MovieCarousel = ({data}) => {
  const {width} = Dimensions.get('window');
  const itemWidth = Math.round(width * 0.7);
  return (
    <Carousel
      layout="default"
      data={data}
      sliderWidth={width}
      itemWidth={itemWidth}
      renderItem={item => <RenderItem data={item} />}
    />
  );
};

const RenderItem = ({data}) => {
  const {title, poster_path} = data.item;
  const imageUrl = `${PATH_IMAGE_HOST}/w500${poster_path}`;
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title}>{title}</Title>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieCarousel;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
