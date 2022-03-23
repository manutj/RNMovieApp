import {StyleSheet, Platform} from 'react-native';
import {Title, Modal, IconButton} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {getTrailerMovieApi} from '../api/movies';
import YouTube from 'react-native-youtube';
import {WebView} from 'react-native-webview';

const MovieVideoModal = ({show, setShow, currentMovieId}) => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    getTrailerMovieApi(currentMovieId).then(data => {
      let idVideo = null;
      data.results.forEach(video => {
        if (video.site === 'YouTube' && !idVideo) {
          idVideo = video.key;
        }
      });
      setVideo(idVideo);
    });
  }, [currentMovieId]);

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <YouTube videoId={video} style={styles.player} />
      ) : (
        <WebView
          style={{width: 500}}
          source={{
            uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`,
          }}
        />
      )}

      <IconButton
        icon={'close'}
        onPress={() => setShow(false)}
        style={styles.closeButton}
      />
    </Modal>
  );
};

export default MovieVideoModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#1ea1f2',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  player: {
    alignSelf: 'stretch',
    height: 300,
  },
});
