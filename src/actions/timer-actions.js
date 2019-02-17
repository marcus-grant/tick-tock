import {
  START_TIMER,
  STOP_TIMER,
  COUNTERS_TIMER,
} from '../middleware/timer-middleware';
import { TICK_COUNTER } from '../constants/action-types';

export const startTimer = (name, interval, timerAction) => ({
  type: START_TIMER,
  payload: {
    name,
    interval,
    timerAction,
  },
});

export const stopTimer = name =>
  ({ type: STOP_TIMER, payload: { name } });

// Specific actions
export const startCountersTimer = interval =>
  startTimer(COUNTERS_TIMER, interval, TICK_COUNTER);

export const stopCountersTimer = stopTimer(COUNTERS_TIMER);
