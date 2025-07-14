import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: Notifications.PermissionStatus;
}

class NotificationService {
  private expoPushToken: string | null = null;

  /**
   * Initialize notification service and request permissions
   */
  async initialize(): Promise<NotificationPermissionStatus> {
    // Only works on physical devices
    if (!Device.isDevice) {
      console.warn('Push notifications only work on physical devices');
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied' as Notifications.PermissionStatus,
      };
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Ask for permission if not already granted
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return {
          granted: false,
          canAskAgain: finalStatus === 'undetermined',
          status: finalStatus,
        };
      }

      // Get the Expo push token
      this.expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo push token:', this.expoPushToken);

      // Android-specific channel setup
      if (Platform.OS === 'android') {
        await this.setupAndroidChannels();
      }

      return {
        granted: true,
        canAskAgain: false,
        status: finalStatus,
      };
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied' as Notifications.PermissionStatus,
      };
    }
  }

  /**
   * Set up Android notification channels
   */
  private async setupAndroidChannels(): Promise<void> {
    // Create notification channels for different types of notifications
    await Notifications.setNotificationChannelAsync('messages', {
      name: 'Messages',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('matches', {
      name: 'New Matches',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('walks', {
      name: 'Walk Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
    });
  }

  /**
   * Send a local notification for new messages
   */
  async sendMessageNotification(dogName: string, message: string): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `New message from ${dogName}`,
          body: message,
          data: { type: 'message', dogName },
          sound: 'default',
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending message notification:', error);
    }
  }

  /**
   * Send a local notification for new matches
   */
  async sendMatchNotification(dogName: string, ownerName: string): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "It's a Match! 🎉",
          body: `You and ${ownerName} both liked each other's dogs! Start chatting about your first walk.`,
          data: { type: 'match', dogName, ownerName },
          sound: 'default',
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending match notification:', error);
    }
  }

  /**
   * Send a walk reminder notification
   */
  async sendWalkReminderNotification(dogName: string, ownerName: string, time: string): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Walk Reminder 🐕',
          body: `Don't forget your walk with ${dogName} and ${ownerName} at ${time}!`,
          data: { type: 'walk_reminder', dogName, ownerName, time },
          sound: 'default',
        },
        trigger: null, // Send immediately (in real app, you'd schedule this)
      });
    } catch (error) {
      console.error('Error sending walk reminder notification:', error);
    }
  }

  /**
   * Schedule a notification for a specific time
   */
  async scheduleNotification(
    title: string,
    body: string,
    scheduleTime: Date,
    data?: any
  ): Promise<string | null> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: { 
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: Math.floor((scheduleTime.getTime() - Date.now()) / 1000),
          repeats: false,
        },
      });
      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  /**
   * Cancel a scheduled notification
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  /**
   * Get all scheduled notifications
   */
  async getAllScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  /**
   * Clear all notifications
   */
  async clearAllNotifications(): Promise<void> {
    try {
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  }

  /**
   * Get the current push token
   */
  getExpoPushToken(): string | null {
    return this.expoPushToken;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
