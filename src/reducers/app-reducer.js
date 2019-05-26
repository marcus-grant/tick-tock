import {
  ENABLE_GLOBAL_NOTIFICATIONS,
  DISABLE_GLOBAL_NOTIFICATIONS,
} from '../constants/action-types';
import Notify from '../util/notifications';

const initState = {
  notifEnabled: Notification.permission === 'granted',
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case DISABLE_GLOBAL_NOTIFICATIONS:
      return {
        ...state,
        notifEnabled: false,
      };
    case ENABLE_GLOBAL_NOTIFICATIONS:
      Notify.askNotificationPermission(true);
      return {
        ...state,
        notifEnabled: Notification.permission === 'granted',
      };
    default:
      return state;
  }
};

export default appReducer;
