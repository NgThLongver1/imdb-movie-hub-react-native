import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Appbar, Text, Button } from 'react-native-paper';
import movies from '../data/movies.json';

const HomeScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // Select the highest-rated or first movie as the featured Hero banner
  const featuredMovie = movies[0];
  const trendingMovies = movies.slice(1);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <Appbar.Header style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>IMDb</Text>
          </View>
          <Text style={styles.headerTitle}>Movie Hub</Text>
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Hero Banner Section */}
          {featuredMovie && (
            <View style={[styles.heroCard, isDesktop && styles.heroCardDesktop]}>
              <Image
                source={{ uri: featuredMovie.poster }}
                style={[styles.heroPoster, isDesktop && styles.heroPosterDesktop]}
                resizeMode="cover"
              />
              <View style={styles.heroDetails}>
                <View style={styles.badgeRow}>
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>FEATURED TODAY</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.starIcon}>★</Text>
                    <Text style={styles.ratingText}>{featuredMovie.rating}</Text>
                  </View>
                </View>

                <Text style={styles.heroTitle}>{featuredMovie.title}</Text>
                <Text style={styles.heroSubtitle}>
                  {featuredMovie.year} • {featuredMovie.genre}
                </Text>
                <Text style={styles.heroDescription} numberOfLines={3}>
                  {featuredMovie.description}
                </Text>

                <View style={styles.heroActionGroup}>
                  <Button
                    mode="contained"
                    buttonColor="#F5C518"
                    textColor="#000000"
                    style={styles.heroButton}
                    onPress={() =>
                      navigation.navigate('Details', { movie: featuredMovie })
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    mode="outlined"
                    textColor="#FFFFFF"
                    style={[styles.heroButton, styles.outlinedButton]}
                    onPress={() => navigation.navigate('MovieList')}
                  >
                    Browse All
                  </Button>
                </View>
              </View>
            </View>
          )}

          {/* Trending / Recommended Row Header */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.yellowBar} />
              <Text style={styles.sectionTitle}>Trending Picks</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('MovieList')}>
              <Text style={styles.seeAllText}>See all &gt;</Text>
            </Pressable>
          </View>

          {/* Horizontal Scrolling Thumbnails */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {trendingMovies.map((movie) => (
              <Pressable
                key={movie.id}
                style={styles.thumbnailCard}
                onPress={() => navigation.navigate('Details', { movie })}
              >
                <Image
                  source={{ uri: movie.poster }}
                  style={styles.thumbnailPoster}
                  resizeMode="cover"
                />
                <View style={styles.thumbnailInfo}>
                  <View style={styles.ratingRow}>
                    <Text style={styles.starIcon}>★</Text>
                    <Text style={styles.ratingText}>{movie.rating}</Text>
                  </View>
                  <Text style={styles.thumbnailTitle} numberOfLines={1}>
                    {movie.title}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#121212',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  brandBadge: {
    backgroundColor: '#F5C518',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  brandBadgeText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 1100,
    paddingHorizontal: 16,
  },
  heroCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  heroCardDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroPoster: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  heroPosterDesktop: {
    width: 420,
    aspectRatio: 16 / 10,
  },
  heroDetails: {
    padding: 20,
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  featuredBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredBadgeText: {
    color: '#F5C518',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    color: '#F5C518',
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 10,
  },
  heroDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  heroActionGroup: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  heroButton: {
    borderRadius: 6,
  },
  outlinedButton: {
    borderColor: '#444444',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowBar: {
    width: 4,
    height: 20,
    backgroundColor: '#F5C518',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#5799EF',
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScroll: {
    gap: 14,
    paddingRight: 16,
  },
  thumbnailCard: {
    width: 140,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  thumbnailPoster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  thumbnailInfo: {
    padding: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  thumbnailTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default HomeScreen;