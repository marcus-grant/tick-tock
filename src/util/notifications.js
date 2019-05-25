import { register } from "./service-worker";

// import { register } from "./service-worker";

/**
 * Alert notification with message
 *
 * @param {string} alertName the name of the alert given
 * @param {string} alertMessage the message for the notification
 */
function alertNotification(alertName, alertOptions) {
  const validatedAlertOptions = alertOptions || {
    body: 'blah',
  };
  // First check if browser supports notifications
  if (!('Notification' in window)) {
    const noSupportMsg = 'This browser doesn\'t support notifications';
    let alertMsg = `${alertName || 'Timer Done!\n'}`;
    alertMsg = `${alertMsg}${alertOptions.body || noSupportMsg}`;
    // eslint-disable-next-line no-alert
    alert(alertMsg);
  } else if (Notification.permission === 'granted') {
    // TODO: Add stuff like buttons to continue a pommodoro, etc.
    const notification = new Notification(alertName, validatedAlertOptions);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permision) => {
      if (permision === 'granted') {
        notification = new Notification(alertName, {
          body: validatedAlertOptions.body,
        });
      }
    });
  }
}

export default alertNotification;
