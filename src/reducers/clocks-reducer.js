// Reducers receive data from Action Creators as Action objects.
// These functions reduce the Action objects to simple state changes for the store.

import {
  // DECREMENT_SECONDS,
  CLOCK_TICK,
  SET_MARK,
  SET_SECONDS,
  START_CLOCK,
  STOP_CLOCK,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';
import CLK_TYPE from '../constants/clock-types';
import TIME_IN_SECS from '../constants/time-constants';


const initState = [
  {
    id: 0,
    seconds: 0,
    isActive: true,
    clockType: CLK_TYPE.POMMODORO,
    timeMark: TIME_IN_SECS.TWENTY_MINUTES, // eslint-disable-line
  },
];

/** Reducer for all state objects related to the many types of clocks widgets --
 * -- that will be used in the future.
 * Each state object uses this data model:
 *   clockID: string (base64 uuid)
 *   seconds: number,
 *   isActive: bool,
 *   clockType: string,
 *   timeMark: number (epoch timestamp, or seconds to reach),
 *   name: The name given to the clock (future update)
 * clockID is somekind of either uint or string of fixed chars, --
 * -- a UUID tied to each widget to manage data relations.
 * seconds: all clocks will use a float number as the primary unit --
 * of data to display time, be it as a timer, stopwatch, or a regular clock.
 * isActive: A boolean to be used when updating time. Some clock widgets --
 * will not always update its listed time, the reducer needs to know this.
 * clockType: A string enumerated in '../constants/clock-types.js'.
 * Used to help ClockContainer HOC render the right kind of widget component.
 * timeMark: A static second mark that gets set and then the clock widget
 * uses the 'seconds' state which dynamically changes to perform its function.
 * For countdown timers this is a number of seconds to reach.
 * For countup timers it always stores the start of the second timer.
 * It's really more of an auxiliary number representing seconds.
 */
const clocksReducer = (state = initState, action) => {
  switch (action.type) {
    case CLOCK_TICK:
      return state.map((clock) => {
        if (clock.isActive) {
          return { ...clock, seconds: clock.seconds + 1 };
        } return clock;
      });
    case SET_MARK:
      return { ...state, timeMark: action.timeMark };
    case SET_SECONDS:
      return { ...state, seconds: action.seconds };
    case START_CLOCK:
      return { ...state, isActive: true };
    case STOP_CLOCK:
      return { ...state, isActive: false };
    default:
      return state;
  }
};

export default clocksReducer;
