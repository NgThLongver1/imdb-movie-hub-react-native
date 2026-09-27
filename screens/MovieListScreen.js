import React from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies.json';

const MovieListScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  // Desktop uses 3 columns; mobile devices use 1 column
  const isDesktop = width > 768;
  const numColumns = isDesktop ? 3 : 1;

  // Insert empty placeholder slot on desktop when row is incomplete
  const displayMovies = isDesktop && movies.length % 3 !== 0
    ? [...movies, { id: 'empty-slot', empty: true }]
    : movies;

  return (
    <View style={styles.container}>
      {/* Top Appbar */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#FFFFFF" onPress={() => navigation.goBack()} />
        <View style={styles.headerTitleContainer}>
          <View style={styles.yellowBar} />
          <Text style={styles.headerTitle}>What to watch</Text>
        </View>
      </Appbar.Header>

      {/* Movie Grid */}
      <FlatList
        key={numColumns}
        data={displayMovies}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={styles.emptyCard} />;
          }
          return (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('Details', { movie: item })}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pure black IMDb background
  },
  header: {
    backgroundColor: '#121212',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  yellowBar: {
    width: 4,
    height: 20,
    backgroundColor: '#F5C518', // IMDb yellow accent bar
    borderRadius: 2,
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  emptyCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'transparent',
  },
});

export default MovieListScreen;