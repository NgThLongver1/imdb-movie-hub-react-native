import React from 'react';
import { View, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Appbar, Text, Chip, Divider } from 'react-native-paper';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // Retrieve the selected movie object passed from MovieListScreen
  const { movie } = route.params || {};

  if (!movie) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction color="#FFFFFF" onPress={() => navigation.goBack()} />
          <Appbar.Content title="Error" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <View style={styles.centered}>
          <Text style={styles.errorText}>No movie details found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#FFFFFF" onPress={() => navigation.goBack()} />
        <Appbar.Content title={movie.title} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.mainWrapper, isDesktop && styles.desktopLayout]}>
          {/* Movie Poster */}
          <View style={[styles.posterWrapper, isDesktop && styles.desktopPoster]}>
            <Image
              source={{ uri: movie.poster }}
              style={styles.poster}
              resizeMode="cover"
            />
          </View>

          {/* Details Section */}
          <View style={[styles.infoSection, isDesktop && styles.desktopInfo]}>
            <Text style={styles.title}>{movie.title}</Text>

            {/* Metadata (Year & Rating) */}
            <View style={styles.metaRow}>
              <Text style={styles.yearText}>{movie.year}</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.ratingValue}>{movie.rating}</Text>
                <Text style={styles.ratingMax}>/10</Text>
              </View>
            </View>

            {/* Genre Chips */}
            <View style={styles.genreContainer}>
              {movie.genre?.split(',').map((g, index) => (
                <Chip key={index} style={styles.genreChip} textStyle={styles.chipText}>
                  {g.trim()}
                </Chip>
              ))}
            </View>

            <Divider style={styles.divider} />

            {/* Plot Summary */}
            <Text style={styles.sectionHeader}>Plot Summary</Text>
            <Text style={styles.description}>
              {movie.description || 'No description available for this movie.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pure black IMDb theme
  },
  header: {
    backgroundColor: '#121212',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  mainWrapper: {
    width: '100%',
    maxWidth: 900,
  },
  desktopLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
    marginTop: 16,
  },
  posterWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  desktopPoster: {
    width: 320,
    flexShrink: 0,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  infoSection: {
    marginTop: 16,
    flex: 1,
  },
  desktopInfo: {
    marginTop: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  yearText: {
    color: '#8E8E93',
    fontSize: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  starIcon: {
    color: '#F5C518',
    fontSize: 15,
    marginRight: 4,
  },
  ratingValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingMax: {
    color: '#8E8E93',
    fontSize: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  genreChip: {
    backgroundColor: '#252525',
    borderColor: '#333333',
  },
  chipText: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  divider: {
    backgroundColor: '#2A2A2A',
    marginVertical: 16,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 24,
  },
});

export default MovieDetailsScreen;