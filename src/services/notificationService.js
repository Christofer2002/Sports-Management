import { Store } from 'react-notifications-component';
import { NOTIFICATION_TYPES, NOTIFICATION_SETTINGS } from '../const/notificationConstants';

/**
 * Notification Service
 * 
 * This module provides services to display notifications using the 'react-notifications-component' library.
 * It includes functions to show success, error, info, and warning notifications.
 * 
 * @module notificationService
 */

/**
 * Add a notification to the store.
 * 
 * @param {string} title - The title of the notification.
 * @param {string} message - The message of the notification.
 * @param {string} type - The type of the notification ('success', 'error', 'info', 'warning').
 */
const addNotification = (title, message, type) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    ...NOTIFICATION_SETTINGS
  });
};

/**
 * Exported notification service with predefined notification types.
 * 
 * This service provides four types of notifications: success, error, info, and warning.
 * Each type of notification has a predefined title and type.
 */
const notificationService = {
  /**
   * Show a success notification.
   * 
   * @param {string} message - The message of the notification.
   */
  success: (message) => addNotification("Success!", message, NOTIFICATION_TYPES.SUCCESS),
  
  /**
   * Show an error notification.
   * 
   * @param {string} message - The message of the notification.
   */
  error: (message) => addNotification("Error!", message, NOTIFICATION_TYPES.ERROR),
  
  /**
   * Show an info notification.
   * 
   * @param {string} message - The message of the notification.
   */
  info: (message) => addNotification("Info!", message, NOTIFICATION_TYPES.INFO),
  
  /**
   * Show a warning notification.
   * 
   * @param {string} message - The message of the notification.
   */
  warning: (message) => addNotification("Warning!", message, NOTIFICATION_TYPES.WARNING)
};

export default notificationService;
