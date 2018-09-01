import {
  INCREMENT_TIMER,
  DECREMENT_TIMER,
  RESET_TIMER,
} from '../constants/action-types';

export function incrementTimer() { console.log('incrementTimer!'); return { type: INCREMENT_TIMER }; }
export function decrementTimer() { return { type: DECREMENT_TIMER }; }
export function resetTimer(seconds) { return { type: RESET_TIMER, seconds }; }
