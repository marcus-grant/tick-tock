const DEFAULT_TIMER_NOTIFICATION_TITLE = 'Timer has finished!';
const DEFAULT_NOTIFICATION_GRANTED_TITLE = 'You granted permissions for notifications';
const DEFAULT_NOTIFICATION_GRANTED_BODY =
  'Alarms will now show up as notifications like this.\nDisable by going into app settings.';

// const isNotifyAPIAvailable = () => 'Notification' in window;

const sendNotification = (title, body, timeout) => {
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

const notificationConfirm = () => {
  sendNotification(
    DEFAULT_NOTIFICATION_GRANTED_TITLE,
    DEFAULT_NOTIFICATION_GRANTED_BODY,
    10000,
  );
};

const askNotificationPermission = (confirmNotification) => {
  if (Notification.permission === 'granted') return;
  Notification.requestPermission()
    .then((perm) => {
      if (perm === 'granted') {
        if (confirmNotification) notificationConfirm();
      }
    });
};

const checkNotificationPermissionsAndRespond =
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

const notify = (title, body, timeout) => {
  checkNotificationPermissionsAndRespond(
    () => sendNotification(title, body, timeout),
    () => askNotificationPermission(true),
  );
};

const notifyTimerWithBody = (body, timeout) => {
  notify(DEFAULT_TIMER_NOTIFICATION_TITLE, body, timeout);
};

export default {
  notifyTimerWithBody,
  askNotificationPermission,
  checkNotificationPermissionsAndRespond,
  sendNotification,
};
