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
import { ThemedText } from '../../components/ui/ThemedText';
import { Spacing, Typography } from '../../constants/Theme';
import { useTheme } from '../../stores/ThemeContext';

export default function SettingsScreen() {
  const { theme, themeType, toggleTheme } = useTheme();
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
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color={theme.primary} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: theme.primary }]}>
          Settings
        </ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: theme.text.primary }]}>Account</ThemedText>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]} onPress={handleEditProfile}>
            <View style={styles.settingLeft}>
              <FontAwesome name="edit" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Edit Profile</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={theme.text.quaternary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]} onPress={handlePrivacySettings}>
            <View style={styles.settingLeft}>
              <FontAwesome name="lock" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Privacy Settings</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={theme.text.quaternary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]} onPress={handleNotificationSettings}>
            <View style={styles.settingLeft}>
              <FontAwesome name="bell" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Notifications</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={theme.text.quaternary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: theme.text.primary }]}>Preferences</ThemedText>
          
          <View style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome name="bell" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Push Notifications</ThemedText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.border.light, true: theme.primary }}
              thumbColor={theme.text.inverse}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome name="map-marker" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Location Services</ThemedText>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: theme.border.light, true: theme.primary }}
              thumbColor={theme.text.inverse}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome name="user" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Show Age on Profile</ThemedText>
            </View>
            <Switch
              value={showAge}
              onValueChange={setShowAge}
              trackColor={{ false: theme.border.light, true: theme.primary }}
              thumbColor={theme.text.inverse}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]}>
            <View style={styles.settingLeft}>
              <FontAwesome 
                name={themeType === 'dark' ? 'moon-o' : 'sun-o'} 
                size={20} 
                color={theme.text.secondary} 
                style={styles.settingIcon} 
              />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>
                {themeType === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </ThemedText>
            </View>
            <Switch
              value={themeType === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border.light, true: theme.primary }}
              thumbColor={theme.text.inverse}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: theme.text.primary }]}>Support</ThemedText>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]} onPress={handleSupport}>
            <View style={styles.settingLeft}>
              <FontAwesome name="comment" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>Contact Support</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={theme.text.quaternary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.background.tertiary }]} onPress={handleAbout}>
            <View style={styles.settingLeft}>
              <FontAwesome name="info-circle" size={20} color={theme.text.secondary} style={styles.settingIcon} />
              <ThemedText style={[styles.settingLabel, { color: theme.text.primary }]}>About Psinder</ThemedText>
            </View>
            <FontAwesome name="chevron-right" size={16} color={theme.text.quaternary} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={[theme.primary, theme.primaryLight]}
              style={styles.gradientButton}
            >
              <ThemedText style={[styles.logoutButtonText, { color: theme.text.inverse }]}>Logout</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.deleteButton, { borderColor: theme.error }]} onPress={handleDeleteAccount}>
            <ThemedText style={[styles.deleteButtonText, { color: theme.error }]}>Delete Account</ThemedText>
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
    // color will be set dynamically in component
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
