import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { useTheme } from '../../stores/ThemeContext';

export default function MatchScreen() {
  const { theme } = useTheme();
  const { dogImage, ownerName } = useLocalSearchParams();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}> 
      <View style={styles.iconContainer}>
        <FontAwesome name="heart" size={80} color={theme.success} />
      </View>
      <ThemedText style={[styles.title, { color: theme.success }]}>It&apos;s a Match!</ThemedText>
      <ThemedText style={[styles.subtitle, { color: theme.text.primary }]}>You and {ownerName} both like each other&apos;s dogs!</ThemedText>
      <View style={styles.dogsContainer}>
        <Image source={{ uri: dogImage as string }} style={styles.dogImage} />
        <FontAwesome name="exchange" size={32} color={theme.primary} style={styles.exchangeIcon} />
        <FontAwesome name="user" size={60} color={theme.primary} style={styles.userIcon} />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.replace('/matches')}
      >
        <ThemedText style={[styles.buttonText, { color: theme.text.inverse }]}>Go to Matches</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton, { borderColor: theme.primary }]}
        onPress={() => router.replace('/home')}
      >
        <ThemedText style={[styles.buttonText, { color: theme.primary }]}>Keep Swiping</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  dogsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  dogImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  exchangeIcon: {
    marginHorizontal: 8,
  },
  userIcon: {
    marginLeft: 16,
  },
  button: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
