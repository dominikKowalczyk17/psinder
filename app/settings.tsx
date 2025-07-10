import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, Typography } from '@/constants/Theme';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [showAge, setShowAge] = React.useState(true);

  const handleEditProfile = () => {
    router.push('/profile-edit');
  };

  const handlePrivacySettings = () => {
    Alert.alert('Privacy Settings', 'Privacy settings coming soon!');
  };

  const handleNotificationSettings = () => {
    Alert.alert('Notification Settings', 'Notification settings coming soon!');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@psinder.com');
  };

  const handleAbout = () => {
    Alert.alert(
      'About Psinder',
      'Psinder v1.0.0\n\nConnect with fellow dog owners and find the perfect walking companions for your furry friends!'
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // In a real app, you would clear the user session here
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: Colors.primary }]}>
          Settings
        </ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: Colors.text.primary }]}>Account</ThemedText>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]} onPress={handleEditProfile}>
            <View style={styles.settingLeft}>
              <FontAwesome name="edit" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Edit Profile</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={Colors.text.quaternary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]} onPress={handlePrivacySettings}>
            <View style={styles.settingLeft}>
              <FontAwesome name="lock" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Privacy Settings</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={Colors.text.quaternary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]} onPress={handleNotificationSettings}>
            <View style={styles.settingLeft}>
              <FontAwesome name="bell" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Notifications</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={Colors.text.quaternary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: Colors.text.primary }]}>Preferences</ThemedText>
          
          <View style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome name="bell" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Push Notifications</ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={Colors.text.inverse}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome name="map-marker" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Location Services</ThemedText>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={Colors.text.inverse}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome name="user" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Show Age on Profile</ThemedText>
            </View>
            <Switch
              value={showAge}
              onValueChange={setShowAge}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={Colors.text.inverse}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: Colors.text.primary }]}>Support</ThemedText>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]} onPress={handleSupport}>
            <View style={styles.settingLeft}>
              <FontAwesome name="comment" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>Contact Support</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={Colors.text.quaternary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: Colors.background.tertiary }]} onPress={handleAbout}>
            <View style={styles.settingLeft}>
              <FontAwesome name="info-circle" size={20} color={Colors.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: Colors.text.primary }]}>About Psinder</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={Colors.text.quaternary} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              style={styles.gradientButton}
            >
              <ThemedText style={[styles.logoutButtonText, { color: Colors.text.inverse }]}>Logout</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.deleteButton, { borderColor: Colors.error }]} onPress={handleDeleteAccount}>
            <ThemedText style={[styles.deleteButtonText, { color: Colors.error }]}>Delete Account</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: Spacing.md,
  },
  backButton: {
    fontSize: Typography.fontSize.xxl,
    color: Colors.primary,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
  },
  placeholder: {
    width: 24,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxxl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: Spacing.md,
  },
  settingLabel: {
    fontSize: Typography.fontSize.base,
  },
  settingArrow: {
    fontSize: Typography.fontSize.xl,
  },
  actionsContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
    gap: Spacing.lg,
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  deleteButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  deleteButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
});
