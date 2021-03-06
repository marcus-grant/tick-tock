import {
  // INC_SECONDS,
  RESET_COUNTER,
  // START_CLOCK,
  DEACTIVATE_COUNTER,
  ACTIVATE_COUNTER,
  SET_COUNTER_STOP,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';

export function deactivateClock(id) { return { type: DEACTIVATE_COUNTER, id }; }
export function activateClock(id) { return { type: ACTIVATE_COUNTER, id }; }
export function resetClock(id) { return { type: RESET_COUNTER, id }; }
export function setStopCount(id, stopCount) {
  return { type: SET_COUNTER_STOP, id, stopCount };
}
