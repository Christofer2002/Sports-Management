import { Store } from 'react-notifications-component';
import { NOTIFICATION_TYPES, NOTIFICATION_SETTINGS } from '../const/notificationConstants';

const addNotification = (title, message, type) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    ...NOTIFICATION_SETTINGS
  });
};

const notificationService = {
  success: (message) => addNotification("Success!", message, NOTIFICATION_TYPES.SUCCESS),
  error: (message) => addNotification("Error!", message, NOTIFICATION_TYPES.ERROR),
  info: (message) => addNotification("Info!", message, NOTIFICATION_TYPES.INFO),
  warning: (message) => addNotification("Warning!", message, NOTIFICATION_TYPES.WARNING)
};

export default notificationService;
