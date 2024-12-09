/**
 * Notification Settings
 * 
 * This module exports configuration constants for handling notifications throughout the application.
 * It includes notification types and default settings for the notification display.
 * 
 * @module notificationSettings
 */

/**
 * Notification Types
 * 
 * An object that defines the various types of notifications available.
 * 
 * @property {string} SUCCESS - Represents a successful operation.
 * @property {string} ERROR - Represents an error or failure.
 * @property {string} INFO - Represents an informational message.
 * @property {string} WARNING - Represents a warning message.
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'danger',
  INFO: 'info',
  WARNING: 'warning'
};

/**
 * Notification Settings
 * 
 * An object that defines the default settings for displaying notifications.
 * 
 * @property {string} container - The position of the notification container on the screen.
 * @property {Array<string>} animationIn - CSS classes for the notification entry animation.
 * @property {Array<string>} animationOut - CSS classes for the notification exit animation.
 * @property {Object} dismiss - Settings for dismissing the notification.
 * @property {number} dismiss.duration - The duration (in milliseconds) the notification remains visible.
 * @property {boolean} dismiss.onScreen - Whether the notification should be dismissed on screen.
 */
export const NOTIFICATION_SETTINGS = {
  container: "bottom-right",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true
  }
};
