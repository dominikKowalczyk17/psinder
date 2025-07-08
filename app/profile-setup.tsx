import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
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

  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({ light: '#666', dark: '#999' }, 'text');

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
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <ThemedText style={styles.backButtonText}>← Back to Login</ThemedText>
          </TouchableOpacity>
          
          <ThemedText type="title" style={styles.title}>
            Complete Your Profile
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Tell us about you and your dog!
          </ThemedText>
        </View>

        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer}>
            <View style={styles.photoPlaceholder}>
              <ThemedText style={styles.photoText}>📷</ThemedText>
              <ThemedText style={styles.photoSubtext}>Add Photo</ThemedText>
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
              style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
              placeholder="Enter your name"
              placeholderTextColor={placeholderColor}
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Your Age</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
              placeholder="Enter your age"
              placeholderTextColor={placeholderColor}
              value={userInfo.age}
              onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>About You</ThemedText>
            <TextInput
              style={[styles.textArea, { color: textColor, borderColor: placeholderColor }]}
              placeholder="Tell us about yourself and what you're looking for in a walking buddy..."
              placeholderTextColor={placeholderColor}
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
              style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
              placeholder="Enter your dog's name"
              placeholderTextColor={placeholderColor}
              value={dogInfo.name}
              onChangeText={(text) => setDogInfo({ ...dogInfo, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Breed *</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
              placeholder="e.g., Golden Retriever, Mixed, etc."
              placeholderTextColor={placeholderColor}
              value={dogInfo.breed}
              onChangeText={(text) => setDogInfo({ ...dogInfo, breed: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Age</ThemedText>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: placeholderColor }]}
              placeholder="Dog's age in years"
              placeholderTextColor={placeholderColor}
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
              style={[styles.textArea, { color: textColor, borderColor: placeholderColor }]}
              placeholder="Describe your dog's personality, favorite activities, walking preferences..."
              placeholderTextColor={placeholderColor}
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
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.saveButtonText}>Complete Profile</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
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
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
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
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderStyle: 'dashed',
  },
  photoText: {
    fontSize: 32,
    marginBottom: 4,
  },
  photoSubtext: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B6B',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: 'transparent',
  },
  selectorOptionSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  selectorText: {
    fontSize: 14,
  },
  selectorTextSelected: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  skipButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
