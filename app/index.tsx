import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./components/ui/ThemedText";
import { Spacing, Typography } from "./constants/Theme";
import { useTheme } from "./stores/ThemeContext";

export default function LoginScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home screen on successful login
      router.replace("/home");
    }, 1500);
  };

  const handleSignUp = () => {
    router.replace("/profile-setup");
  };

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Password reset functionality coming soon!");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.primary }]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={[styles.title, { color: theme.text.primary }]}>
                Welcome to Psinder
              </ThemedText>
              <ThemedText
                style={[styles.subtitle, { color: theme.text.secondary }]}
              >
                Find your perfect match
              </ThemedText>
            </View>

            {/* Login Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text.primary,
                      borderColor: theme.border.medium,
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor={theme.text.quaternary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text.primary,
                      borderColor: theme.border.medium,
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor={theme.text.quaternary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
              >
                <ThemedText
                  style={[
                    styles.forgotPasswordText,
                    { color: theme.text.accent },
                  ]}
                >
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>
              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[theme.primary, theme.primaryLight]}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <ThemedText
                    style={[
                      styles.loginButtonText,
                      { color: theme.text.inverse },
                    ]}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
              {/* Social Login Options */}
              <View style={styles.socialContainer}>
                <View style={styles.divider}>
                  <View
                    style={[
                      styles.line,
                      { backgroundColor: theme.border.medium },
                    ]}
                  />
                  <ThemedText
                    style={[
                      styles.dividerText,
                      { color: theme.text.quaternary },
                    ]}
                  >
                    or continue with
                  </ThemedText>
                  <View
                    style={[
                      styles.line,
                      { backgroundColor: theme.border.medium },
                    ]}
                  />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { borderColor: theme.border.medium },
                    ]}
                    onPress={() =>
                      Alert.alert("Google", "Google login coming soon!")
                    }
                  >
                    <FontAwesome
                      name="google"
                      size={16}
                      color={theme.text.secondary}
                      style={{ marginRight: Spacing.sm }}
                    />
                    <ThemedText
                      style={[
                        styles.socialButtonText,
                        { color: theme.text.secondary },
                      ]}
                    >
                      Google
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      { borderColor: theme.border.medium },
                    ]}
                    onPress={() =>
                      Alert.alert("Facebook", "Facebook login coming soon!")
                    }
                  >
                    <FontAwesome
                      name="facebook"
                      size={16}
                      color={theme.text.secondary}
                      style={{ marginRight: Spacing.sm }}
                    />
                    <ThemedText
                      style={[
                        styles.socialButtonText,
                        { color: theme.text.secondary },
                      ]}
                    >
                      Facebook
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <ThemedText
                  style={[styles.signUpText, { color: theme.text.tertiary }]}
                >
                  Don&apos;t have an account?{" "}
                </ThemedText>
                <TouchableOpacity onPress={handleSignUp}>
                  <ThemedText
                    style={[styles.signUpLink, { color: theme.text.accent }]}
                  >
                    Sign Up
                  </ThemedText>
                </TouchableOpacity>
              </View>{" "}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.huge,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.huge,
  },
  title: {
    fontSize: Typography.fontSize.huge,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    textAlign: "center",
    paddingTop: Spacing.lg,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.base,
    backgroundColor: "transparent",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: Spacing.xxl,
  },
  forgotPasswordText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  loginButton: {
    marginBottom: Spacing.xxl,
    borderRadius: 12,
    overflow: "hidden",
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  gradientButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  socialContainer: {
    marginBottom: Spacing.xxl,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.sm,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  socialButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: Typography.fontSize.sm,
  },
  signUpLink: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
});
