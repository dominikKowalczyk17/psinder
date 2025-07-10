import { ThemedText } from '@/components/ThemedText';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/Theme';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileSetupScreen() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    bio: '',
  });
  
  const [dogInfo, setDogInfo] = useState({
    name: '',
    breed: '',
    age: '',
    size: 'Medium',
    energy: 'Medium',
    bio: '',
  });

  const sizeOptions = ['Small', 'Medium', 'Large'];
  const energyOptions = ['Low', 'Medium', 'High', 'Very High'];

  const handleSaveProfile = () => {
    if (!userInfo.name || !dogInfo.name || !dogInfo.breed) {
      Alert.alert('Error', 'Please fill in the required fields');
      return;
    }

    Alert.alert(
      'Profile Complete! 🎉',
      'Welcome to Psinder! You can now start swiping to find walking buddies for your dog.',
      [
        {
          text: 'Start Swiping',
          onPress: () => router.replace('/home'),
        },
      ]
    );
  };

  const handleBackToLogin = () => {
    Alert.alert(
      'Go Back to Login?',
      'Your profile information will be lost. Are you sure you want to go back?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go Back',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  const renderSelector = (
    options: string[],
    selected: string,
    onSelect: (value: string) => void
  ) => (
    <View style={styles.selectorContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.selectorOption,
            selected === option && styles.selectorOptionSelected,
          ]}
          onPress={() => onSelect(option)}
        >
          <ThemedText
            style={[
              styles.selectorText,
              selected === option && styles.selectorTextSelected,
            ]}
          >
            {option}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <FontAwesome name="arrow-left" size={16} color={Colors.primary} style={{ marginRight: Spacing.sm }} />
            <ThemedText style={[styles.backButtonText, { color: Colors.primary }]}>Back to Login</ThemedText>
          </TouchableOpacity>
          
          <ThemedText style={[styles.title, { color: Colors.text.primary }]}>
            Complete Your Profile
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: Colors.text.secondary }]}>
            Tell us about you and your dog!
          </ThemedText>
        </View>

        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer}>
            <View style={[styles.photoPlaceholder, { borderColor: Colors.primary }]}>
              <FontAwesome name="camera" size={32} color={Colors.primary} />
              <ThemedText style={[styles.photoSubtext, { color: Colors.primary }]}>Add Photo</ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* User Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            About You
          </ThemedText>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Your Name *</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="Enter your name"
              placeholderTextColor={Colors.text.quaternary}
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Your Age</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="Enter your age"
              placeholderTextColor={Colors.text.quaternary}
              value={userInfo.age}
              onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>About You</ThemedText>
            <TextInput
              style={[styles.textArea, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="Tell us about yourself and what you're looking for in a walking buddy..."
              placeholderTextColor={Colors.text.quaternary}
              value={userInfo.bio}
              onChangeText={(text) => setUserInfo({ ...userInfo, bio: text })}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Dog Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            About Your Dog
          </ThemedText>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Dog&apos;s Name *</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="Enter your dog's name"
              placeholderTextColor={Colors.text.quaternary}
              value={dogInfo.name}
              onChangeText={(text) => setDogInfo({ ...dogInfo, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Breed *</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="e.g., Golden Retriever, Mixed, etc."
              placeholderTextColor={Colors.text.quaternary}
              value={dogInfo.breed}
              onChangeText={(text) => setDogInfo({ ...dogInfo, breed: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Age</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="Dog's age in years"
              placeholderTextColor={Colors.text.quaternary}
              value={dogInfo.age}
              onChangeText={(text) => setDogInfo({ ...dogInfo, age: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Size</ThemedText>
            {renderSelector(sizeOptions, dogInfo.size, (size) =>
              setDogInfo({ ...dogInfo, size })
            )}
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Energy Level</ThemedText>
            {renderSelector(energyOptions, dogInfo.energy, (energy) =>
              setDogInfo({ ...dogInfo, energy })
            )}
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>About Your Dog</ThemedText>
            <TextInput
              style={[styles.textArea, { color: Colors.text.primary, borderColor: Colors.border.medium }]}
              placeholder="Describe your dog's personality, favorite activities, walking preferences..."
              placeholderTextColor={Colors.text.quaternary}
              value={dogInfo.bio}
              onChangeText={(text) => setDogInfo({ ...dogInfo, bio: text })}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Skip Button */}
          <TouchableOpacity style={styles.skipButton} onPress={() => router.replace('/home')}>
            <ThemedText style={styles.skipButtonText}>Skip for Now</ThemedText>
          </TouchableOpacity>

          {/* Complete Profile Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.saveButtonText}>Complete Profile</ThemedText>
            </LinearGradient>
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
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xs,
  },
  backButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    paddingTop: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primarySubtle,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  photoText: {
    fontSize: Typography.fontSize.huge,
    marginBottom: Spacing.xs,
  },
  photoSubtext: {
    fontSize: Typography.fontSize.xs,
  },
  section: {
    marginBottom: Spacing.xxxl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.lg,
    color: Colors.primary,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
    color: Colors.text.secondary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.base,
    backgroundColor: 'transparent',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    backgroundColor: 'transparent',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  selectorOption: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    backgroundColor: 'transparent',
  },
  selectorOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  selectorTextSelected: {
    color: Colors.text.inverse,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  skipButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  saveButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
});
