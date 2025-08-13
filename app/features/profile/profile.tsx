import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { DogDetailsSection } from '../../components/profile/DogDetailsSection';
import { DogPhotosSection } from '../../components/profile/DogPhotosSection';
import { ProfileActions } from '../../components/profile/ProfileActions';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { UserInfoSection } from '../../components/profile/UserInfoSection';
import { Spacing, Typography } from '../../constants/Theme';
import { useTheme } from '../../stores/ThemeContext';

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
      <ProfileHeader onBack={() => router.back()} onSettings={handleSettings} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DogPhotosSection dogName={mockUserData.dog.name} dogPhotos={dogPhotos} onAddPhoto={handleAddDogPhoto} />
        <DogDetailsSection
          name={mockUserData.dog.name}
          breed={mockUserData.dog.breed}
          energy={mockUserData.dog.energy}
          size={mockUserData.dog.size}
          bio={mockUserData.dog.bio}
        />
        <UserInfoSection
          name={mockUserData.name}
          age={mockUserData.age}
          bio={mockUserData.bio}
          onEdit={handleEditProfile}
        />
        <ProfileActions
          onEdit={handleEditProfile}
          onBackToSwiping={() => router.push('/home')}
        />
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
