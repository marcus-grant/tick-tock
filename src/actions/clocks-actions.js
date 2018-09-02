import {
  SET_SECONDS,
  SET_MARK,
  CLOCK_TICK,
  START_CLOCK,
  STOP_CLOCK,
  STOP_GLOBAL_TIMER,
  START_GLOBAL_TIMER,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';

// TODO: Implement id functionality to later manage updating time for many clock widgets.
// TODO: Implement increment/decrement amounts for different global clock times.
export function setSeconds(seconds = 0) { return { type: SET_SECONDS, seconds }; }
export function setMark(timeMark) { return { type: SET_MARK, timeMark }; }
export function clockTick() { return { type: CLOCK_TICK }; }
export function startClock() { return { type: START_CLOCK }; }
export function stopClock() { return { type: STOP_CLOCK }; }
export function stopGlobalTimer() { return { type: STOP_GLOBAL_TIMER }; }
export function startGlobalTimer() { return { type: START_GLOBAL_TIMER }; }
// TODO: Implement add/remove clock when clock list implemented
