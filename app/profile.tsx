import PhotoUpload from '@/components/PhotoUpload';
import { ThemedText } from '@/components/ThemedText';
import { Spacing, Typography } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock user data - in a real app this would come from state management/API
const mockUserData = {
  id: 1,
  name: 'Alex Johnson',
  age: 28,
  bio: 'Dog lover and outdoor enthusiast. Looking for walking buddies for my furry friend!',
  dog: {
    name: 'Max',
    breed: 'Golden Retriever',
    age: 4,
    size: 'Large',
    energy: 'High',
    bio: 'Friendly and energetic! Loves meeting new dogs and going on adventures.',
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
    ],
  },
  joinDate: 'January 2024',
  totalMatches: 23,
  walksTaken: 15,
};

export default function ProfileViewScreen() {
  const { theme } = useTheme();
  const [dogPhotos, setDogPhotos] = useState(mockUserData.dog.photos);

  const handleEditProfile = () => {
    router.push('/profile-edit');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleAddDogPhoto = (uri: string) => {
    setDogPhotos(prev => [...prev, uri]);
    Alert.alert('Success', 'Dog photo added successfully!');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color={theme.primary} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: theme.primary }]}>
          Profile
        </ThemedText>
        <TouchableOpacity onPress={handleSettings}>
          <FontAwesome name="cog" size={20} color={theme.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dog Photos Section - Now First */}
        <View style={styles.dogPhotosSection}>
          <ThemedText style={[styles.sectionTitle, { color: theme.text.primary }]}>Meet {mockUserData.dog.name}</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {dogPhotos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.dogPhoto} />
            ))}
            <PhotoUpload
              onPhotoSelected={handleAddDogPhoto}
              style={styles.addPhotoButton}
              label="Add Photo"
            />
          </ScrollView>
        </View>

        {/* Dog Details Section */}
        <View style={styles.dogSection}>
          <View style={styles.dogHeader}>
            <ThemedText style={[styles.dogName, { color: theme.text.primary }]}>
              {mockUserData.dog.name}
            </ThemedText>
          </View>
          <ThemedText style={[styles.dogBreed, { color: theme.text.secondary }]}>{mockUserData.dog.breed}</ThemedText>
          
          {/* Dog Tags */}
          <View style={styles.tagsContainer}>
            <View style={[styles.tag, { backgroundColor: theme.primarySubtle }]}>
              <ThemedText style={[styles.tagText, { color: theme.text.inverse }]}>{mockUserData.dog.energy} Energy</ThemedText>
            </View>
            <View style={[styles.tag, { backgroundColor: theme.background.tertiary }]}>
              <ThemedText style={[styles.tagText, { color: theme.text.secondary }]}>{mockUserData.dog.size}</ThemedText>
            </View>
          </View>

          <ThemedText style={[styles.dogBio, { color: theme.text.tertiary }]}>{mockUserData.dog.bio}</ThemedText>
        </View>

        {/* User Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.nameSection}>
            <ThemedText style={[styles.userName, { color: theme.text.primary }]}>{mockUserData.name}, {mockUserData.age}</ThemedText>
            <TouchableOpacity style={[styles.editButton, { borderColor: theme.primary }]} onPress={handleEditProfile}>
              <ThemedText style={[styles.editButtonText, { color: theme.primary }]}>Edit Profile</ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText style={[styles.userBio, { color: theme.text.tertiary }]}>{mockUserData.bio}</ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <LinearGradient
              colors={[theme.primary, theme.primaryLight]}
              style={styles.gradientButton}
            >
              <ThemedText style={[styles.actionButtonText, { color: theme.text.inverse }]}>Edit Profile</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.primary }]} onPress={() => router.push('/home')}>
            <ThemedText style={[styles.secondaryButtonText, { color: theme.primary }]}>Back to Swiping</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    paddingTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.lg,
    paddingTop: Spacing.md,
  },
  photosScroll: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  dogPhotosSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxxl,
  },
  dogPhoto: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginRight: Spacing.lg,
  },
  addPhotoButton: {
    width: 140,
    height: 140,
  },
  infoSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxxl,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    paddingTop: Spacing.md,
  },
  editButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  userBio: {
    fontSize: Typography.fontSize.base,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 16,
    paddingVertical: Spacing.xl,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
  },
  dogSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxxl,
  },
  dogHeader: {
    marginBottom: Spacing.sm,
  },
  dogName: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    paddingTop: Spacing.sm,
  },
  dogBreed: {
    fontSize: Typography.fontSize.lg,
    marginBottom: Spacing.md,
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
    borderColor: 'lightgray',
  },
  tagText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  dogBio: {
    fontSize: Typography.fontSize.sm,
    lineHeight: 20,
  },
  actionsContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
    gap: Spacing.md,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  secondaryButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
});
