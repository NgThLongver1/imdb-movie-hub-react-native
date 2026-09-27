import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

const MovieCard = ({ movie, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Hover animation handlers for desktop/web
  const handleHoverIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.03,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      style={styles.pressableContainer}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        {/* Poster Image with standard 2:3 ratio */}
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
        />

        {/* IMDb-style content section */}
        <View style={styles.content}>
          {/* Rating row with yellow star */}
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{movie.rating}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>

          {/* Subtitle / Metadata */}
          <Text style={styles.metadata} numberOfLines={1}>
            {movie.year} • {movie.genre}
          </Text>

          {/* Interactive Action Button */}
          <Button
            mode="contained"
            buttonColor="#252525"
            textColor="#5799EF"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onPress}
          >
            Details
          </Button>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    margin: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Distinct dark gray card surface
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',     // Subtle border to pop against black background
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  content: {
    padding: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starIcon: {
    color: '#F5C518', // Official IMDb yellow
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  metadata: {
    color: '#8E8E93',
    fontSize: 13,
    marginBottom: 12,
  },
  button: {
    borderRadius: 4,
    marginTop: 'auto',
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default MovieCard;