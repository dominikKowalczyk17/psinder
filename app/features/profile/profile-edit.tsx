import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { useTheme } from '../../stores/ThemeContext';

// Mock user data - in a real app this would come from state management/API
const mockUserData = {
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
  },
};

const dogSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
const energyLevels = ['Low', 'Medium', 'High', 'Very High'];

export default function ProfileEditScreen() {
  const { theme } = useTheme();

  // User form state
  const [userName, setUserName] = useState(mockUserData.name);
  const [userAge, setUserAge] = useState(mockUserData.age.toString());
  const [userBio, setUserBio] = useState(mockUserData.bio);

  // Dog form state
  const [dogName, setDogName] = useState(mockUserData.dog.name);
  const [dogBreed, setDogBreed] = useState(mockUserData.dog.breed);
  const [dogAge, setDogAge] = useState(mockUserData.dog.age.toString());
  const [dogSize, setDogSize] = useState(mockUserData.dog.size);
  const [dogEnergy, setDogEnergy] = useState(mockUserData.dog.energy);
  const [dogBio, setDogBio] = useState(mockUserData.dog.bio);

  const handleSave = () => {
    // Basic validation
    if (!userName.trim() || !userAge.trim() || !dogName.trim() || !dogBreed.trim() || !dogAge.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // In a real app, you would save this data to your backend/state management
    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <ThemedText style={styles.cancelButton}>Cancel</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Edit Profile
        </ThemedText>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText style={styles.saveButton}>Save</ThemedText>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Your Information</ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Name *</ThemedText>
              <TextInput
                style={[styles.input, { color: theme.text.primary }]}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your name"
                placeholderTextColor={theme.text.quaternary}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Age *</ThemedText>
              <TextInput
                style={[styles.input, { color: theme.text.primary }]}
                value={userAge}
                onChangeText={setUserAge}
                placeholder="Enter your age"
                placeholderTextColor={theme.text.quaternary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Bio</ThemedText>
              <TextInput
                style={[styles.textArea, { color: theme.text.primary }]}
                value={userBio}
                onChangeText={setUserBio}
                placeholder="Tell us about yourself..."
                placeholderTextColor={theme.text.quaternary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Dog Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Your Dog&apos;s Information</ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Dog&apos;s Name *</ThemedText>
              <TextInput
                style={[styles.input, { color: theme.text.primary }]}
                value={dogName}
                onChangeText={setDogName}
                placeholder="Enter your dog's name"
                placeholderTextColor={theme.text.quaternary}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Breed *</ThemedText>
              <TextInput
                style={[styles.input, { color: theme.text.primary }]}
                value={dogBreed}
                onChangeText={setDogBreed}
                placeholder="Enter your dog's breed"
                placeholderTextColor={theme.text.quaternary}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Age *</ThemedText>
              <TextInput
                style={[styles.input, { color: theme.text.primary }]}
                value={dogAge}
                onChangeText={setDogAge}
                placeholder="Enter your dog's age"
                placeholderTextColor={theme.text.quaternary}
                keyboardType="numeric"
              />
            </View>

            {/* Size Selector */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Size</ThemedText>
              <View style={styles.selectorContainer}>
                {dogSizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.selectorButton,
                      dogSize === size && styles.selectedButton,
                    ]}
                    onPress={() => setDogSize(size)}
                  >
                    <ThemedText
                      style={[
                        styles.selectorText,
                        dogSize === size && styles.selectedText,
                      ]}
                    >
                      {size}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Energy Level Selector */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Energy Level</ThemedText>
              <View style={styles.selectorContainer}>
                {energyLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.selectorButton,
                      dogEnergy === level && styles.selectedButton,
                    ]}
                    onPress={() => setDogEnergy(level)}
                  >
                    <ThemedText
                      style={[
                        styles.selectorText,
                        dogEnergy === level && styles.selectedText,
                      ]}
                    >
                      {level}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Dog&apos;s Bio</ThemedText>
              <TextInput
                style={[styles.textArea, { color: theme.text.primary }]}
                value={dogBio}
                onChangeText={setDogBio}
                placeholder="Tell us about your dog..."
                placeholderTextColor={theme.text.quaternary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.saveButtonContainer} onPress={handleSave}>
              <LinearGradient
                colors={[theme.primary, theme.primaryLight]}
                style={styles.gradientButton}
              >
                <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  cancelButton: {
    fontSize: 16,
    // color dynamicznie inline
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color dynamicznie inline
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    // color dynamicznie inline
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    // color dynamicznie inline
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    // color dynamicznie inline
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    // backgroundColor, borderColor dynamicznie inline
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    // backgroundColor, borderColor dynamicznie inline
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor, backgroundColor dynamicznie inline
  },
  selectedButton: {
    // backgroundColor, borderColor dynamicznie inline
  },
  selectorText: {
    fontSize: 14,
    // color dynamicznie inline
  },
  selectedText: {
    fontWeight: '600',
    // color dynamicznie inline
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  saveButtonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    // color dynamicznie inline
  },
});
