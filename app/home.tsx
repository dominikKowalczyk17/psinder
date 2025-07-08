import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock data for dogs
const mockDogs = [
  {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    owner: 'Sarah',
    distance: '0.5 miles away',
    bio: 'Loves playing fetch and long walks in the park! Very friendly with other dogs.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=600&fit=crop',
    energy: 'High',
    size: 'Large',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Border Collie',
    age: 2,
    owner: 'Mike',
    distance: '0.8 miles away',
    bio: 'Super smart and loves agility training. Looking for active walking buddies!',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=600&fit=crop',
    energy: 'Very High',
    size: 'Medium',
  },
  {
    id: 3,
    name: 'Charlie',
    breed: 'French Bulldog',
    age: 4,
    owner: 'Emma',
    distance: '1.2 miles away',
    bio: 'Gentle and calm, perfect for leisurely strolls. Great with kids and other pets.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=600&fit=crop',
    energy: 'Low',
    size: 'Small',
  },
];

export default function HomeScreen() {
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const [rotate] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(1));

  const currentDog = mockDogs[currentDogIndex];

  const resetAnimation = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
    scale.setValue(1);
  };

  const swipeCard = (direction: 'left' | 'right') => {
    const toValue = direction === 'right' ? screenWidth + 100 : -screenWidth - 100;
    
    Animated.parallel([
      Animated.timing(translateX, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: direction === 'right' ? 0.3 : -0.3,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (direction === 'right') {
        Alert.alert('It\'s a Match! 🐕', `You liked ${currentDog?.name}! We'll notify ${currentDog?.owner} about your interest.`);
      }
      
      // Move to next dog
      setCurrentDogIndex((prev) => (prev + 1) % mockDogs.length);
      resetAnimation();
    });
  };

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only respond to horizontal gestures
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      // Update card position and rotation based on gesture
      translateX.setValue(gestureState.dx);
      rotate.setValue(gestureState.dx / screenWidth);
    },
    onPanResponderRelease: (_, gestureState) => {
      const swipeThreshold = screenWidth * 0.25; // 25% of screen width
      const velocity = Math.abs(gestureState.vx);
      
      if (Math.abs(gestureState.dx) > swipeThreshold || velocity > 0.5) {
        // Determine swipe direction
        const direction = gestureState.dx > 0 ? 'right' : 'left';
        swipeCard(direction);
      } else {
        // Snap back to center if not swiped enough
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ]).start();
      }
    },
  });

  const handleLike = () => swipeCard('right');
  const handlePass = () => swipeCard('left');

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      case 'Very High': return '#E91E63';
      default: return '#9E9E9E';
    }
  };

  if (!currentDog) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.noMoreText}>No more dogs to show!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Psinder
        </ThemedText>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <ThemedText style={styles.headerButtonText}>🔍</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/matches')}
          >
            <ThemedText style={styles.headerButtonText}>💬</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <ThemedText style={styles.headerButtonText}>👤</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Stack */}
      <View style={styles.cardContainer}>
        {/* Next card (background) */}
        {mockDogs[currentDogIndex + 1] && (
          <View style={[styles.card, styles.nextCard]}>
            <Image
              source={{ uri: mockDogs[currentDogIndex + 1].image }}
              style={styles.cardImage}
            />
          </View>
        )}

        {/* Current card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX },
                { translateY },
                { rotate: rotate.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ['-30deg', '30deg'],
                }) },
                { scale },
              ],
            },
          ]}
        >
          {/* Dog Photo */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: currentDog.image }} style={styles.cardImage} />
          </View>

          {/* Dog Info Section - Separate from image */}
          <View style={styles.dogInfo}>
            <View style={styles.dogHeader}>
              <View style={styles.dogNameSection}>
                <ThemedText style={styles.dogName}>
                  {currentDog.name}, {currentDog.age}
                </ThemedText>
                <ThemedText style={styles.distance}>📍{currentDog.distance}</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.dogBreed}>{currentDog.breed}</ThemedText>
            <ThemedText style={styles.dogOwner}>Owner: {currentDog.owner}</ThemedText>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              <View style={[styles.tag, { backgroundColor: getEnergyColor(currentDog.energy) }]}>
                <ThemedText style={styles.tagText}>{currentDog.energy} Energy</ThemedText>
              </View>
              <View style={styles.tag}>
                <ThemedText style={styles.tagText}>{currentDog.size}</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.dogBio}>{currentDog.bio}</ThemedText>
          </View>

          {/* Swipe indicators */}
          <Animated.View
            style={[
              styles.swipeIndicator,
              styles.likeIndicator,
              {
                opacity: translateX.interpolate({
                  inputRange: [0, 150],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
                transform: [{
                  scale: translateX.interpolate({
                    inputRange: [0, 150],
                    outputRange: [0.8, 1.2],
                    extrapolate: 'clamp',
                  }),
                }],
              },
            ]}
          >
            <ThemedText style={styles.swipeText}>LIKE</ThemedText>
          </Animated.View>

          <Animated.View
            style={[
              styles.swipeIndicator,
              styles.passIndicator,
              {
                opacity: translateX.interpolate({
                  inputRange: [-150, 0],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
                transform: [{
                  scale: translateX.interpolate({
                    inputRange: [-150, 0],
                    outputRange: [1.2, 0.8],
                    extrapolate: 'clamp',
                  }),
                }],
              },
            ]}
          >
            <ThemedText style={styles.swipeText}>PASS</ThemedText>
          </Animated.View>
        </Animated.View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handlePass}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.actionButtonGradient}
          >
            <ThemedText style={styles.actionButtonText}>❌</ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.superLikeButton}>
          <LinearGradient
            colors={['#4FC3F7', '#29B6F6']}
            style={styles.actionButtonGradient}
          >
            <ThemedText style={styles.actionButtonText}>⭐</ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <LinearGradient
            colors={['#66BB6A', '#4CAF50']}
            style={styles.actionButtonGradient}
          >
            <ThemedText style={styles.actionButtonText}>❤️</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: screenWidth - 40,
    height: screenHeight * 0.7,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'column',
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dogInfo: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  dogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  dogNameSection: {
    flex: 1,
    paddingRight: 14,
  },
  dogName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 30,
  },
  distanceSection: {
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
  distance: {
    fontSize: 13,
    color: '#666',
    opacity: 0.8,
  },
  dogBreed: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  dogOwner: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  tagText: {
    fontSize: 12,
    color: '#803c37',
    fontWeight: '600',
  },
  dogBio: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  swipeIndicator: {
    position: 'absolute',
    top: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 3,
  },
  likeIndicator: {
    right: 20,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  passIndicator: {
    left: 20,
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  swipeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 40,
    paddingTop: 20,
    paddingBottom: 40,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  superLikeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 24,
  },
  noMoreText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
