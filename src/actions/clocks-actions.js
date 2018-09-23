import {
  // SET_MARK,
  // INC_SECONDS,
  CLOCK_TICK,
  RESET_CLOCK,
  // START_CLOCK,
  DEACTIVATE_CLOCK,
  ACTIVATE_CLOCK,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';
import {
  GLOBAL_TIMER,
  START_TIMER,
  STOP_TIMER,
} from '../middleware/timer-middleware';

// TODO: Implement increment/decrement amounts for different global clock times.
// TODO: Implement add/remove clock when clock list implemented
// export function setMark(id, timeMark) { return { type: SET_MARK, id, timeMark }; }
// export function incrementSeconds() { return { type: INC_SECONDS }; }
export function deactivateClock(id) { return { type: DEACTIVATE_CLOCK, id }; }
export function activateClock(id) { return { type: ACTIVATE_CLOCK, id }; }
export function clockTick() { return { type: CLOCK_TICK }; }
export function resetClock(id) { return { type: RESET_CLOCK, id }; }
// export function clockTick() { return { type: CLOCK_TICK }; }
// export function startClock(id) { return { type: START_CLOCK, id }; }

export const startGlobalTimer = interval => ({
  interval,
  type: START_TIMER,
  timerAction: CLOCK_TICK,
  name: GLOBAL_TIMER,
});

export const stopGlobalTimer = () =>
  ({ type: STOP_TIMER, name: GLOBAL_TIMER });
