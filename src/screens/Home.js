import {ScrollView, StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {getPopularMoviesApi} from '../api/movies';
import MovieCarousel from '../components/MovieCarousel';

const Home = ({navigation}) => {
  const [popularMovies, setPopularMovies] = useState(null);
  useEffect(() => {
    getPopularMoviesApi().then(data => setPopularMovies(data.results));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {popularMovies && (
        <View style={styles.container}>
          <Title>Current Popular Movies</Title>
          <MovieCarousel data={popularMovies} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
});
export default Home;
