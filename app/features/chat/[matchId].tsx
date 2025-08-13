
import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import type { Message } from "../../api/types/chat";
import { ThemedText } from '../../components/ui/ThemedText';
import { useTheme } from "../../stores/ThemeContext";

const ChatScreen: React.FC = () => {
  const { theme } = useTheme();
  const { matchId, dogName, dogAvatar } = useLocalSearchParams<{ matchId?: string; dogName?: string; dogAvatar?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now().toString(), text: input, sender: 'me', timestamp: Date.now() }
    ]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 48 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <FontAwesome name="arrow-left" size={24} color={theme.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {dogAvatar ? (
            <Image source={{ uri: dogAvatar as string }} style={styles.headerAvatar} />
          ) : null}
          <ThemedText style={[styles.headerTitle, { color: theme.primary }]}>{dogName || 'Dog Name'}</ThemedText>
        </View>
        <View style={styles.headerRight} />
      </View>
      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === 'me'
              ? { alignSelf: 'flex-end', backgroundColor: theme.primary }
              : { alignSelf: 'flex-start', backgroundColor: theme.background.secondary }
          ]}>
            <ThemedText style={{ color: theme.text.inverse }}>{item.text}</ThemedText>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: theme.text.primary, backgroundColor: theme.background.secondary }]}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor={theme.text.tertiary}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <ThemedText style={{ color: theme.text.accent }}>Send</ThemedText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    width: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32,
  },
  messagesContainer: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginVertical: 4,
    maxWidth: '75%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginBottom: 28,
  },
  input: {
    flex: 1,
    borderRadius: 16,
    padding: 10,
    marginRight: 8,
  },
  sendButton: {
    padding: 10,
  },
});
