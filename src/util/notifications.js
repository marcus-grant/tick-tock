export const isNotifyAPIAvailable = () => 'Notification' in window;

export const isNotificationPermissionGranted = () => Notification.permission === 'granted';

export const isNotificationPermissionDenied = () => Notification.permission === 'denied';

export const requestNotificationPermission = (permissionGrantedCallback) => {
  Notification.requestPermission().then(permissionGrantedCallback());
};

export const notificationConfirm = () => {
  var n = new Notification('This app will now notify you on timed events like alarms!');
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
