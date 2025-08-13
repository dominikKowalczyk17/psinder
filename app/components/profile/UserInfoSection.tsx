import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../stores/ThemeContext";
import { ThemedText } from "../ui/ThemedText";

interface UserInfoSectionProps {
  name: string;
  age: number;
  bio: string;
  onEdit: () => void;
}

export const UserInfoSection: React.FC<UserInfoSectionProps> = ({
  name,
  age,
  bio,
  onEdit,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.infoSection}>
      <View style={styles.nameSection}>
        <ThemedText style={[styles.userName, { color: theme.text.primary }]}>
          {name}, {age}
        </ThemedText>
      </View>
      <ThemedText style={[styles.userBio, { color: theme.text.tertiary }]}>
        {bio}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  nameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 12,
  },
  editButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  userBio: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
});
