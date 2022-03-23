import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel';
import {PATH_IMAGE_HOST} from '../constants/constants';
import MovieVideoTrailer from '../components/MovieVideoTrailer';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/images/starDark.png';
import starLight from '../assets/images/starLight.png';
import React from 'react';

const MovieCarousel = ({data, setShowVideo, ...other}) => {
  const {width} = Dimensions.get('window');
  const itemWidth = Math.round(width * 0.7);

  return (
    <Carousel
      layout="default"
      data={data}
      sliderWidth={width}
      itemWidth={itemWidth}
      renderItem={item => (
        <RenderItem data={item} setShowVideo={setShowVideo} {...other} />
      )}
    />
  );
};

const RenderItem = ({data, setShowVideo, ...other}) => {
  const {title, poster_path, id, vote_average, overview, release_date} =
    data.item;
  const imageUrl = `${PATH_IMAGE_HOST}/w500${poster_path}`;

  return (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.card}>
          <Image style={styles.image} source={{uri: imageUrl}} />
          <Title style={styles.title}>{`${title} (${release_date.substr(
            0,
            4,
          )})`}</Title>
        </View>
      </TouchableWithoutFeedback>
      <MovieVideoTrailer setShowVideo={setShowVideo} movieId={id} {...other} />
      <MovieRating voteAverage={vote_average} overview={overview} />
    </>
  );
};

function MovieRating({voteAverage, overview}) {
  const media = voteAverage / 2;
  const {theme} = usePreferences();
  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor={'#ffc205'}
      />
      <Text style={styles.textRating}>{media}</Text>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  );
}

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
    textAlign: 'center',
  },
  viewRating: {
    marginHorizontal: 25,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textRating: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
  overview: {
    fontWeight: '600',
    textAlign: 'justify',
    marginTop: 20,
    color: '#8697a5',
    fontSize: 15,
  },
});
