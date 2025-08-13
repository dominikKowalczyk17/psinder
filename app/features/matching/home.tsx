import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { MatchModal } from '../../components/shared/MatchModal';
import { ThemedText } from '../../components/ui/ThemedText';
import { Spacing, Typography, getEnergyColor } from '../../constants/Theme';
import { useTheme } from '../../stores/ThemeContext';

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
  const { theme } = useTheme();
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const [rotate] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(1));
  const [showActionIndicator, setShowActionIndicator] = useState<null | 'like' | 'pass'>(null); // for full overlay after swipe
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchDog, setMatchDog] = useState<any>(null);

  const currentDog = mockDogs[currentDogIndex];

  const resetAnimation = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
    scale.setValue(1);
  };

  const swipeCard = (direction: 'left' | 'right') => {
    const toValue = direction === 'right' ? screenWidth + 100 : -screenWidth - 100;
    setShowActionIndicator(direction === 'right' ? 'like' : 'pass');
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
      // Show full indicator for 600ms, then advance
      setTimeout(() => {
        if (direction === 'right') {
          setMatchDog(currentDog);
          setShowMatchModal(true);
        } else {
          setCurrentDogIndex((prev) => (prev + 1) % mockDogs.length);
        }
        resetAnimation();
        setShowActionIndicator(null);
      }, 600);
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

  if (!currentDog && !showMatchModal) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background.primary }]}> 
        <ThemedText style={[styles.noMoreText, { color: theme.text.secondary }]}>No more dogs to show!</ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}> 
      {/* Match Modal */}
      {showMatchModal && matchDog && (
        <MatchModal
          visible={showMatchModal}
          onClose={() => {
            setShowMatchModal(false);
            setCurrentDogIndex((prev) => (prev + 1) % mockDogs.length);
            setMatchDog(null);
          }}
          dogName={matchDog.name}
          dogImages={[matchDog.image]}
        />
      )}
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={[styles.headerTitle, { color: theme.primary }]}>
          Psinder
        </ThemedText>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: theme.primarySubtle }]}
            onPress={() => router.push('/matches')}
          >
            <FontAwesome name="comment" size={20} color={theme.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: theme.primarySubtle }]}
            onPress={() => router.push('/profile')}
          >
            <FontAwesome name="user" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Stack */}
      <View style={styles.cardContainer}>
        {/* Show indicator background instead of next card while swiping */}
        {showActionIndicator === null && (
          <Animated.View
            style={[
              styles.card,
              styles.nextCard,
              {
                backgroundColor: translateX.interpolate({
                  inputRange: [-50, 0, 50],
                  outputRange: [theme.error, theme.background.card, theme.success],
                  extrapolate: 'clamp',
                }),
                opacity: translateX.interpolate({
                  inputRange: [-150, 0, 150],
                  outputRange: [0.7, 0, 0.7],
                  extrapolate: 'clamp',
                }),
                zIndex: 0,
              },
            ]}
          >
            <Animated.View style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              opacity: translateX.interpolate({
                inputRange: [-50, 0, 50],
                outputRange: [1, 0, 1],
                extrapolate: 'clamp',
              }),
              transform: [{
                scale: translateX.interpolate({
                  inputRange: [-150, 0, 150],
                  outputRange: [1.1, 0.8, 1.1],
                  extrapolate: 'clamp',
                }),
              }],
            }}>
              { /* Show icon depending on swipe direction */ }
              <Animated.View style={{ opacity: translateX.interpolate({ inputRange: [30, 120], outputRange: [0, 1], extrapolate: 'clamp' }) }}>
                <FontAwesome name="heart" size={80} color={theme.text.inverse} />
              </Animated.View>
              <Animated.View style={{ opacity: translateX.interpolate({ inputRange: [-120, -30], outputRange: [1, 0], extrapolate: 'clamp' }) }}>
                <FontAwesome name="times" size={80} color={theme.text.inverse} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        )}

        {/* Current card */}
        {showActionIndicator === null && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.card,
              {
                backgroundColor: theme.background.card,
                shadowColor: theme.text.primary,
                transform: [
                  { translateX },
                  { translateY },
                  { rotate: rotate.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-30deg', '30deg'],
                  }) },
                  { scale },
                ],
                zIndex: 1,
              },
            ]}
          >
            {/* ...existing card content... */}
            <View style={[styles.imageContainer, { backgroundColor: theme.background.tertiary }]}> 
              <Image source={{ uri: currentDog.image }} style={styles.cardImage} />
            </View>
            <View style={[
              styles.dogInfo, 
              { 
                backgroundColor: theme.background.secondary,
                borderTopColor: theme.border.light 
              }
            ]}>
              <View style={styles.dogHeader}>
                <View style={styles.dogNameSection}>
                  <ThemedText style={[styles.dogName, { color: theme.text.primary }]}> 
                    {currentDog.name}, {currentDog.age}
                  </ThemedText>
                  <ThemedText style={[styles.distance, { color: theme.text.tertiary }]}> 
                    <FontAwesome name="map-marker" size={14} color={theme.text.tertiary} /> {currentDog.distance}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.dogBreed, { color: theme.text.secondary }]}>{currentDog.breed}</ThemedText>
              <ThemedText style={[styles.dogOwner, { color: theme.text.tertiary }]}>Owner: {currentDog.owner}</ThemedText>
              <View style={styles.tagsContainer}>
                <View style={[styles.tag, { backgroundColor: getEnergyColor(currentDog.energy), borderColor: theme.border.light }]}> 
                  <ThemedText style={[styles.tagText, { color: theme.text.inverse }]}>{currentDog.energy} Energy</ThemedText>
                </View>
                <View style={[styles.tag, { backgroundColor: theme.background.tertiary, borderColor: theme.border.light }]}> 
                  <ThemedText style={[styles.tagText, { color: theme.text.secondary }]}>{currentDog.size}</ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.dogBio, { color: theme.text.tertiary }]}>{currentDog.bio}</ThemedText>
            </View>
          </Animated.View>
        )}

        {/* After swipe, show full overlay with icon, covering the card */}
        {showActionIndicator && (
          <View style={[styles.card, { backgroundColor: showActionIndicator === 'like' ? theme.success : theme.error, alignItems: 'center', justifyContent: 'center', zIndex: 2 }]}> 
            <FontAwesome name={showActionIndicator === 'like' ? 'heart' : 'times'} size={100} color={theme.text.inverse} />
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handlePass}>
          <LinearGradient
            colors={[theme.error, theme.primaryLight]}
            style={styles.actionButtonGradient}
          >
            <FontAwesome name="times" size={28} color={theme.text.inverse} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.superLikeButton}>
          <LinearGradient
            colors={[theme.info, theme.info]}
            style={styles.actionButtonGradient}
          >
            <FontAwesome name="star" size={28} color={theme.text.inverse} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <LinearGradient
            colors={[theme.success, theme.success]}
            style={styles.actionButtonGradient}
          >
            <FontAwesome name="heart" size={28} color={theme.text.inverse} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    paddingTop: Spacing.lg,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: Typography.fontSize.xl,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  card: {
    width: screenWidth - 40,
    height: screenHeight * 0.7,
    borderRadius: 20,
    // backgroundColor and shadowColor applied inline with theme
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
    // backgroundColor applied inline with theme
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dogInfo: {
    // backgroundColor and borderTopColor applied inline with theme
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderTopWidth: 1,
  },
  dogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  dogNameSection: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  dogName: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: 30,
  },
  distanceSection: {
    alignSelf: 'flex-start',
    paddingTop: 2,
  },
  distance: {
    fontSize: Typography.fontSize.sm,
    lineHeight: 18,
  },
  dogBreed: {
    fontSize: Typography.fontSize.lg,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  dogOwner: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 15,
    borderWidth: 1,
    // borderColor applied inline with theme
  },
  tagText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  dogBio: {
    fontSize: Typography.fontSize.sm,
    lineHeight: 20,
  },
  swipeIndicator: {
    position: 'absolute',
    top: 100,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    borderWidth: 3,
  },
  likeIndicator: {
    right: Spacing.xl,
    // borderColor and backgroundColor applied inline with theme
  },
  passIndicator: {
    left: Spacing.xl,
    // borderColor and backgroundColor applied inline with theme
  },
  swipeText: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    // color applied inline with theme
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
    paddingHorizontal: Spacing.huge,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.huge,
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
    fontSize: Typography.fontSize.xxl,
  },
  noMoreText: {
    fontSize: Typography.fontSize.lg,
    textAlign: 'center',
    marginTop: 50,
  },
});
