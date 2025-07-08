import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    dogName: 'Buddy',
    ownerName: 'Sarah',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop',
    lastMessage: 'Would love to walk together tomorrow!',
    timestamp: '2h ago',
    unread: true,
  },
  {
    id: 2,
    dogName: 'Luna',
    ownerName: 'Mike',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=100&h=100&fit=crop',
    lastMessage: 'Luna loves the park near downtown',
    timestamp: '1d ago',
    unread: false,
  },
  {
    id: 3,
    dogName: 'Charlie',
    ownerName: 'Emma',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop',
    lastMessage: 'Thank you for the great walk!',
    timestamp: '3d ago',
    unread: false,
  },
];

// Mock data for recent matches (new matches without messages yet)
const recentMatches = [
  {
    id: 4,
    dogName: 'Max',
    ownerName: 'James',
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=100&h=100&fit=crop',
    matchTime: '5m ago',
  },
  {
    id: 5,
    dogName: 'Bella',
    ownerName: 'Lisa',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop',
    matchTime: '1h ago',
  },
];

export default function MatchesScreen() {
  const [activeTab, setActiveTab] = useState<'messages' | 'matches'>('matches');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');

  const renderMatch = ({ item }: { item: typeof recentMatches[0] }) => (
    <TouchableOpacity style={styles.recentMatchItem}>
      <Image source={{ uri: item.image }} style={styles.recentMatchImage} />
      <View style={styles.matchBadge}>
        <ThemedText style={styles.matchBadgeText}>NEW</ThemedText>
      </View>
      <ThemedText style={styles.recentMatchName}>{item.dogName}</ThemedText>
      <ThemedText style={styles.recentMatchTime}>{item.matchTime}</ThemedText>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: typeof mockMatches[0] }) => (
    <TouchableOpacity 
      style={[styles.messageItem, { borderBottomColor: borderColor }]}
      onPress={() => {
        // Navigate to chat screen (to be implemented)
        console.log('Navigate to chat with', item.ownerName);
      }}
    >
      <View style={styles.messageImageContainer}>
        <Image source={{ uri: item.image }} style={styles.messageImage} />
        {item.unread && <View style={styles.unreadIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <ThemedText style={styles.messageName}>
            {item.dogName} & {item.ownerName}
          </ThemedText>
          <ThemedText style={styles.messageTime}>{item.timestamp}</ThemedText>
        </View>
        <ThemedText 
          style={[styles.messageText, item.unread && styles.messageTextUnread]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={styles.backButton}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Matches
        </ThemedText>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'matches' && styles.activeTab]}
          onPress={() => setActiveTab('matches')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'matches' && styles.activeTabText]}>
            New Matches ({recentMatches.length})
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
            Messages ({mockMatches.filter(m => m.unread).length})
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'matches' ? (
        <View style={styles.content}>
          {recentMatches.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>
                  🎉 New Walking Buddies!
                </ThemedText>
                <ThemedText style={styles.sectionSubtitle}>
                  Send a message to start planning your walk
                </ThemedText>
              </View>
              <FlatList
                data={recentMatches}
                renderItem={renderMatch}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.matchesGrid}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyStateEmoji}>🐕</ThemedText>
              <ThemedText style={styles.emptyStateTitle}>No matches yet</ThemedText>
              <ThemedText style={styles.emptyStateText}>
                Keep swiping to find the perfect walking buddy for your dog!
              </ThemedText>
              <TouchableOpacity 
                style={styles.backToSwipingButton}
                onPress={() => router.push('/home')}
              >
                <ThemedText style={styles.backToSwipingText}>Back to Swiping</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.content}>
          {mockMatches.length > 0 ? (
            <FlatList
              data={mockMatches}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyStateEmoji}>💬</ThemedText>
              <ThemedText style={styles.emptyStateTitle}>No messages yet</ThemedText>
              <ThemedText style={styles.emptyStateText}>
                Start a conversation with your matches to plan a walk!
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerRight: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  matchesGrid: {
    paddingBottom: 20,
  },
  recentMatchItem: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  recentMatchImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  matchBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recentMatchName: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  recentMatchTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  messageImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  messageImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontWeight: '600',
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  messageText: {
    fontSize: 14,
    opacity: 0.8,
  },
  messageTextUnread: {
    fontWeight: '500',
    opacity: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  backToSwipingButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  backToSwipingText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
