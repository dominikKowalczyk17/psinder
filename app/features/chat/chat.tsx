import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { useTheme } from '../../stores/ThemeContext';

export default function ChatScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <ThemedText style={[styles.title, { color: theme.text.primary }]}>
        Chat Feature Coming Soon
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
