import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../stores/ThemeContext";
import { ThemedText } from "../ui/ThemedText";

interface ProfileHeaderProps {
  onBack: () => void;
  onSettings: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onBack,
  onSettings,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <FontAwesome name="arrow-left" size={24} color={theme.primary} />
      </TouchableOpacity>
      <ThemedText style={[styles.headerTitle, { color: theme.primary }]}>
        Profile
      </ThemedText>
      <TouchableOpacity onPress={onSettings}>
        <FontAwesome name="cog" size={20} color={theme.text.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 8,
  },
});
