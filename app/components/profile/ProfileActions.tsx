import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../stores/ThemeContext";
import { ThemedText } from "../ui/ThemedText";

interface ProfileActionsProps {
  onEdit: () => void;
  onBackToSwiping: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEdit,
  onBackToSwiping,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
        <LinearGradient
          colors={[theme.primary, theme.primaryLight]}
          style={styles.gradientButton}
        >
          <ThemedText
            style={[styles.actionButtonText, { color: theme.text.inverse }]}
          >
            Edit Profile
          </ThemedText>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.secondaryButton, { borderColor: theme.primary }]}
        onPress={onBackToSwiping}
      >
        <ThemedText
          style={[styles.secondaryButtonText, { color: theme.primary }]}
        >
          Back to Swiping
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
