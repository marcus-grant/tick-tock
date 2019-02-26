/**
 * Alert notification with message
 *
 * @param {string} alertName the name of the alert given
 * @param {string} alertMessage the message for the notification
 */
function alertNotification(alertName, alertMessage) {
  let notification; // eslint-disable-line
  // First check if browser supports notifications
  if (!('Notification' in window)) {
    const noSupportMsg = 'This browser doesn\'t support notifications';
    let alertMsg = `${alertName || 'Timer Done!\n'}`;
    alertMsg = `${alertMsg}${alertMessage || noSupportMsg}`;
    // eslint-disable-next-line no-alert
    alert(alertMsg);
  } else if (Notification.permission === 'granted') {
    // TODO: Add stuff like buttons to continue a pommodoro, etc.
    notification = new Notification(alertName, {
      body: `${alertMessage || 'Timer Done!'}`,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permision) => {
      if (permision === 'granted') {
        notification = new Notification(alertName, {
          body: `${alertMessage || 'Timer Done!'}`,
        });
      }
    });
  }
}

export default alertNotification;
