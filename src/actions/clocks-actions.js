import {
  // SET_SECONDS, // TODO: This should be RESET_CLOCK
  // SET_MARK,
  CLOCK_TICK,
  // START_CLOCK,
  STOP_CLOCK,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';

// TODO: Implement increment/decrement amounts for different global clock times.
// TODO: Implement add/remove clock when clock list implemented
// export function setMark(id, timeMark) { return { type: SET_MARK, id, timeMark }; }
export function clockTick() { return { type: CLOCK_TICK }; }
export function stopClock(id) { return { type: STOP_CLOCK, id }; }
// export function startClock(id) { return { type: START_CLOCK, id }; }
