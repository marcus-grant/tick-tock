import {
  ENABLE_GLOBAL_NOTIFICATIONS,
  DISABLE_GLOBAL_NOTIFICATIONS,
} from '../constants/action-types';

export function enableGlobalNotifications() {
  return { type: ENABLE_GLOBAL_NOTIFICATIONS };
}
export function disableGlobalNotifications() {
  return { type: DISABLE_GLOBAL_NOTIFICATIONS };
}
