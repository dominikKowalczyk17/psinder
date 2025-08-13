import {
  FormDogInfo,
  FormUserInfo,
  transformProfileDataForApi,
} from "@/app/api/transformers/dataTransformers";
import { useAuth } from "@/app/hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";
import { BorderRadius, Spacing, Typography } from "../../constants/Theme";
import { useTheme } from "../../stores/ThemeContext";

export default function ProfileSetupScreen() {
  const { theme } = useTheme();
  const { register, isLoading, error } = useAuth();

  const [userInfo, setUserInfo] = useState<FormUserInfo>({
    name: "",
    password: "",
    age: "",
    bio: "",
  });

  const [dogInfo, setDogInfo] = useState<FormDogInfo>({
    name: "",
    breed: "",
    age: "",
    size: "Medium",
    energy: "Medium",
    bio: "",
  });

  const sizeOptions = ["Small", "Medium", "Large"];
  const energyOptions = ["Low", "Medium", "High", "Very High"];

  const handleSaveProfile = async () => {
    if (!userInfo.name || !dogInfo.name || !dogInfo.breed) {
      Alert.alert("Error", "Please fill in the required fields");
      return;
    }

    try {
      const apiData = transformProfileDataForApi(userInfo, dogInfo);
      register(apiData);
      Alert.alert(
        "Profile Complete! 🎉",
        "Welcome to Psinder! You can now start swiping to find walking buddies for your dog.",
        [
          {
            text: "Start Swiping",
            onPress: () => router.replace("/home"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  };

  const handleBackToLogin = () => {
    Alert.alert(
      "Go Back to Login?",
      "Your profile information will be lost. Are you sure you want to go back?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go Back",
          style: "destructive",
          onPress: () => router.replace("/"),
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
            selected === option && {
              backgroundColor: theme.primary,
              borderColor: theme.primary,
            },
          ]}
          onPress={() => onSelect(option)}
        >
          <ThemedText
            style={[
              styles.selectorText,
              selected === option && { color: theme.text.inverse },
            ]}
          >
            {option}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.primary }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToLogin}
          >
            <FontAwesome
              name="arrow-left"
              size={16}
              color={theme.primary}
              style={{ marginRight: Spacing.sm }}
            />
            <ThemedText
              style={[styles.backButtonText, { color: theme.primary }]}
            >
              Back to Login
            </ThemedText>
          </TouchableOpacity>

          <ThemedText style={[styles.title, { color: theme.text.primary }]}>
            Complete Your Profile
          </ThemedText>
          <ThemedText
            style={[styles.subtitle, { color: theme.text.secondary }]}
          >
            Tell us about you and your dog!
          </ThemedText>
        </View>

        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer}>
            <View
              style={[
                styles.photoPlaceholder,
                {
                  backgroundColor: theme.primarySubtle,
                  borderColor: theme.primary,
                },
              ]}
            >
              <FontAwesome name="camera" size={32} color={theme.primary} />
              <ThemedText
                style={[styles.photoSubtext, { color: theme.primary }]}
              >
                Add Photo
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* User Information */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            About You
          </ThemedText>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: theme.text.secondary }]}>
              Your Name *
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Enter your name"
              placeholderTextColor={theme.text.quaternary}
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: theme.text.secondary }]}>
              Your Password *
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={theme.text.quaternary}
              value={userInfo.password}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, password: text })
              }
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Your Age</ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Enter your age"
              placeholderTextColor={theme.text.quaternary}
              value={userInfo.age}
              onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>About You</ThemedText>
            <TextInput
              style={[
                styles.textArea,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Tell us about yourself and what you're looking for in a walking buddy..."
              placeholderTextColor={theme.text.quaternary}
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
            <ThemedText style={[styles.label, { color: theme.text.secondary }]}>
              Dog&apos;s Name *
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Enter your dog's name"
              placeholderTextColor={theme.text.quaternary}
              value={dogInfo.name}
              onChangeText={(text) => setDogInfo({ ...dogInfo, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={[styles.label, { color: theme.text.secondary }]}>
              Breed *
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="e.g., Golden Retriever, Mixed, etc."
              placeholderTextColor={theme.text.quaternary}
              value={dogInfo.breed}
              onChangeText={(text) => setDogInfo({ ...dogInfo, breed: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Age</ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Dog's age in years"
              placeholderTextColor={theme.text.quaternary}
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
              style={[
                styles.textArea,
                { color: theme.text.primary, borderColor: theme.border.medium },
              ]}
              placeholder="Describe your dog's personality, favorite activities, walking preferences..."
              placeholderTextColor={theme.text.quaternary}
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
          <TouchableOpacity
            style={[styles.skipButton, { borderColor: theme.primary }]}
            onPress={() => router.replace("/home")}
          >
            <ThemedText
              style={[styles.skipButtonText, { color: theme.primary }]}
            >
              Skip for Now
            </ThemedText>
          </TouchableOpacity>

          {/* Complete Profile Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <LinearGradient
              colors={[theme.primary, theme.primaryLight]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText
                style={[styles.saveButtonText, { color: theme.text.inverse }]}
              >
                Complete Profile
              </ThemedText>
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
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
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
    textAlign: "center",
    paddingTop: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    textAlign: "center",
  },
  photoSection: {
    alignItems: "center",
    marginBottom: Spacing.xxxl,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  photoPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
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
  },
  sectionSubtext: {
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.base,
    backgroundColor: "transparent",
  },
  textArea: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    backgroundColor: "transparent",
    minHeight: 80,
    textAlignVertical: "top",
  },
  selectorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },
  selectorOption: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  selectorText: {
    fontSize: Typography.fontSize.sm,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  skipButton: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    backgroundColor: "transparent",
  },
  skipButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  saveButton: {
    borderRadius: BorderRadius.md,
    overflow: "hidden",
  },
  gradientButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
});
