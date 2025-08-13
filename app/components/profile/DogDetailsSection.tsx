import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../stores/ThemeContext';
import { ThemedText } from '../ui/ThemedText';

interface DogDetailsSectionProps {
  name: string;
  breed: string;
  energy: string;
  size: string;
  bio: string;
}

export const DogDetailsSection: React.FC<DogDetailsSectionProps> = ({ name, breed, energy, size, bio }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.dogSection}>
      <View style={styles.dogHeader}>
        <ThemedText style={[styles.dogName, { color: theme.text.primary }]}>{name}</ThemedText>
      </View>
      <ThemedText style={[styles.dogBreed, { color: theme.text.secondary }]}>{breed}</ThemedText>
      <View style={styles.tagsContainer}>
        <View style={[styles.tag, { backgroundColor: theme.primarySubtle }]}> 
          <ThemedText style={[styles.tagText, { color: theme.text.accent }]}>{energy} Energy</ThemedText>
        </View>
        <View style={[styles.tag, { backgroundColor: theme.background.tertiary }]}> 
          <ThemedText style={[styles.tagText, { color: theme.text.secondary }]}>{size}</ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.dogBio, { color: theme.text.tertiary }]}>{bio}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  dogSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  dogHeader: {
    marginBottom: 8,
  },
  dogName: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  dogBreed: {
    fontSize: 18,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dogBio: {
    fontSize: 14,
    lineHeight: 20,
  },
});
