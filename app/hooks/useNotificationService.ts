
import { useEffect, useState } from 'react';
import { NotificationPermissionStatus, notificationService } from '../api/services/notificationService';

/**
 * Custom hook to interact with the notification service.
 * - Initializes notification permissions
 * - Exposes notification actions (send, schedule, cancel, etc.)
 *
 * TODO: What notification-related state do we need to track here?
 */
export const useNotificationService = () => {
  // TODO: Should we track permission status, push token, or errors?
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermissionStatus | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Should we initialize permissions on mount, or expose a function to do it manually?
    const init = async () => {
      try {
        const status = await notificationService.initialize();
        setPermissionStatus(status);
        setExpoPushToken(notificationService.getExpoPushToken());
      } catch (err) {
        setError('Failed to initialize notifications');
      }
    };
    // TODO: Uncomment to auto-initialize
    // init();
  }, []);

  /**
   * Send a local message notification
   * @param dogName Dog's name
   * @param message Message text
   */
  const sendMessageNotification = async (dogName: string, message: string) => {
    // TODO: Should we handle errors or return a status?
    await notificationService.sendMessageNotification(dogName, message);
  };

  /**
   * Send a match notification
   */
  const sendMatchNotification = async (dogName: string, ownerName: string) => {
    await notificationService.sendMatchNotification(dogName, ownerName);
  };

  // TODO: Should we expose schedule/cancel/clear notification methods here?

  return {
    permissionStatus,
    expoPushToken,
    error,
    sendMessageNotification,
    sendMatchNotification,
    // TODO: Add more actions as needed
  };
};
