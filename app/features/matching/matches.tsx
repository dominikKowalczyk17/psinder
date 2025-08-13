import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedText } from '../../components/ui/ThemedText';
import { Spacing, Typography } from '../../constants/Theme';
import { useTheme } from '../../stores/ThemeContext';

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
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'messages' | 'matches'>('matches');

  const renderMatch = ({ item }: { item: typeof recentMatches[0] }) => (
    <TouchableOpacity style={styles.recentMatchItem}>
      <Image source={{ uri: item.image }} style={styles.recentMatchImage} />
      <View style={[styles.matchBadge, { backgroundColor: theme.success }]}>
        <ThemedText style={[styles.matchBadgeText, { color: theme.text.inverse }]}>NEW</ThemedText>
      </View>
      <ThemedText style={[styles.recentMatchName, { color: theme.text.primary }]}>{item.dogName}</ThemedText>
      <ThemedText style={[styles.recentMatchTime, { color: theme.text.quaternary }]}>{item.matchTime}</ThemedText>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: typeof mockMatches[0] }) => (
    <TouchableOpacity 
      style={[styles.messageItem, { borderBottomColor: theme.border.light }]}
      onPress={() => {
        router.push({
        pathname: '/chat/[matchId]',
        params: { matchId: item.id, dogName: item.dogName, dogAvatar: item.image }
      });
      }}
    >
      <View style={styles.messageImageContainer}>
        <Image source={{ uri: item.image }} style={styles.messageImage} />
        {item.unread && <View style={[styles.unreadIndicator, { backgroundColor: theme.primary }]} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <ThemedText style={[styles.messageName, { color: theme.text.primary }]}>
            {item.dogName} & {item.ownerName}
          </ThemedText>
          <ThemedText style={[styles.messageTime, { color: theme.text.quaternary }]}>{item.timestamp}</ThemedText>
        </View>
        <ThemedText 
          style={[
            styles.messageText,
            { color: theme.text.tertiary },
            item.unread && [styles.messageTextUnread, { color: theme.text.secondary }]
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color={theme.primary} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: theme.primary }]}>
          Matches
        </ThemedText>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab, 
            { backgroundColor: theme.primarySubtle },
            activeTab === 'matches' && [styles.activeTab, { backgroundColor: theme.primary }]
          ]}
          onPress={() => setActiveTab('matches')}
        >
          <ThemedText style={[
            styles.tabText,
            { color: theme.text.secondary },
            activeTab === 'matches' && [styles.activeTabText, { color: theme.text.inverse }]
          ]}>
            New Matches ({recentMatches.length})
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab, 
            { backgroundColor: theme.primarySubtle },
            activeTab === 'messages' && [styles.activeTab, { backgroundColor: theme.primary }]
          ]}
          onPress={() => setActiveTab('messages')}
        >
          <ThemedText style={[
            styles.tabText,
            { color: theme.text.secondary },
            activeTab === 'messages' && [styles.activeTabText, { color: theme.text.inverse }]
          ]}>
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
                <ThemedText style={[styles.sectionTitle, { color: theme.text.primary }]}>
                  🎉 New Walking Buddies!
                </ThemedText>
                <ThemedText style={[styles.sectionSubtitle, { color: theme.text.tertiary }]}>
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
              <ThemedText style={[styles.emptyStateTitle, { color: theme.text.primary }]}>No matches yet</ThemedText>
              <ThemedText style={[styles.emptyStateText, { color: theme.text.tertiary }]}>
                Keep swiping to find the perfect walking buddy for your dog!
              </ThemedText>
              <TouchableOpacity 
                style={[styles.backToSwipingButton, { backgroundColor: theme.primary }]}
                onPress={() => router.push('/home')}
              >
                <ThemedText style={[styles.backToSwipingText, { color: theme.text.inverse }]}>Back to Swiping</ThemedText>
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
              <ThemedText style={[styles.emptyStateTitle, { color: theme.text.primary }]}>No messages yet</ThemedText>
              <ThemedText style={[styles.emptyStateText, { color: theme.text.tertiary }]}>
                Start a conversation with your matches to plan a walk!
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </View>
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
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  backButton: {
    fontSize: Typography.fontSize.xxl,
    // color applied inline with theme
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
  },
  headerRight: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 20,
    marginHorizontal: Spacing.xs,
    // backgroundColor applied inline with theme
  },
  activeTab: {
    // backgroundColor applied inline with theme
  },
  tabText: {
    textAlign: 'center',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  activeTabText: {
    // color applied inline with theme
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  sectionHeader: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  matchesGrid: {
    paddingBottom: Spacing.xl,
  },
  recentMatchItem: {
    flex: 1,
    alignItems: 'center',
    margin: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.05)', // fallback color
  },
  recentMatchImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.sm,
  },
  matchBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  matchBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  recentMatchName: {
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.sm,
    marginBottom: 2,
  },
  recentMatchTime: {
    fontSize: Typography.fontSize.xs,
  },
  messageItem: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderBottomWidth: 1,
  },
  messageImageContainer: {
    position: 'relative',
    marginRight: Spacing.md,
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
    borderWidth: 2,
    borderColor: '#FFFFFF', // fallback color
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  messageName: {
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.base,
  },
  messageTime: {
    fontSize: Typography.fontSize.xs,
  },
  messageText: {
    fontSize: Typography.fontSize.sm,
  },
  messageTextUnread: {
    fontWeight: Typography.fontWeight.medium,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.huge,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xxl,
  },
  backToSwipingButton: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: 20,
  },
  backToSwipingText: {
    fontWeight: Typography.fontWeight.semibold,
  },
});
