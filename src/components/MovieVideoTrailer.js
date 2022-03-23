import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import React from 'react';

const MovieVideoTrailer = ({setShowVideo, movieId, setCurrentMovieId}) => {
  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon={'play'}
        onPress={() => {
          setShowVideo(true), setCurrentMovieId(movieId);
        }}
        color={'#000'}
        size={30}
        style={styles.playButton}
      />
    </View>
  );
};

export default MovieVideoTrailer;

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: '#fff',
    marginTop: '-175%',
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewPlay: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});
