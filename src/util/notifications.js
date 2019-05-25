import { Disposable } from "rx-core";
import { settings } from "cluster";

export const DEFAULT_TIMER_NOTIFICATION_TITLE = a'Timer has finished!';
export const DEFAULT_NOTIFICATION_GRANTED_TITLE = 'You granted permissions for notifications';
export const DEFAULT_NOTIFICATION_GRANTED_BODY =
  'Alarms will now show up as notifications like this.\nDisable by going into app settings.';

export const isNotifyAPIAvailable = () => 'Notification' in window;

export const requestNotificationPermission = (permissionGrantedCallback) => {
  if (permissionGrantedCallback) {
    Notification.requestPermission().then(permissionGrantedCallback());
  }
};

export const sendNotification = (title, body, timeout) => {
  // TODO: Add notification icon in the future
  const nObject = {
    icon: undefined,
    body: body || '', // TODO: should this be left undefined?
    tag: 'tick-tock',
  };
  const n = new Notification(title, nObject);
  n.onclick = () => {
    parent.focus(); // eslint-disable-line
    window.focus();
    this.close();
  };
  setTimeout(n.close.bind(n), timeout || 8000);
};

export const notificationConfirm = () => {
  sendNotification(
    DEFAULT_NOTIFICATION_GRANTED_TITLE,
    DEFAULT_NOTIFICATION_GRANTED_BODY,
    5000,
  );
};

export const checkNotificationPermissionsAndRespond =
  (ifGrantedCallback, ifFailCallback) => {
    switch (Notification.permission) {
      case 'granted':
        ifGrantedCallback();
        break;
      case 'denied':
      case 'default':
        ifFailCallback();
        break;
      default:
        break;
    }
  };

export const askNotificationPermission = () => {
};

export const bodiedAlarmNotification = (body) => {
  checkNotificationPermissionsAndRespond(
    sendNotification(
      DEFAULT_TIMER_NOTIFICATION_TITLE,
      body,
    ),
    askNotificationPermission,
  );
};

export const mainNotification = () => {
  // Check if the browser supports notifications
  if (!isNotifyAPIAvailable) {
    console.log('notifications available');
    alert('This browser does not support desktop notifications!');
  } else if (!isNotificationPermissionGranted()) {
    console.log('Permission for notification not granted');
    // Check if granted permission, if so show it
    requestNotificationPermission(notificationConfirm);
    var n = new Notification('Hi There - Change Notification');
  }
  else if (isNotificationPermissionGranted()) {
    var n = new Notification('notifications are allowed');
  }
  else if (isNotificationPermissionDenied()) {
    console.log('notif');
    var n = new Notification('Notification');
  }
  console.log('done');
};
