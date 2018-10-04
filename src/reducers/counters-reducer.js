// Reducers receive data from Action Creators as Action objects.
// These functions reduce the Action objects to simple state changes for the store.

import {
  TICK_COUNTER,
  RESET_COUNTER,
  DEACTIVATE_COUNTER,
  ACTIVATE_COUNTER,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';
import CLK_TYPE from '../constants/clock-types';
// import SECS from '../constants/time-constants';
// import {
//   tickClocks,
//   stopClockWithID,
// } from './helpers/clocks-reducer-helpers';

// Properly normalize with selectors from http://bit.ly/2Mx8Npu
const initState = {
  countersPeriod: 1,
  activeIds: ['dEADb33F'],
  allIds: ['dEADb33F'],
  byId: {
    dEADb33F: {
      id: 'dEADb33F',
      count: 0,
      isActive: true,
      type: CLK_TYPE.POMMODORO,
      // stopCount: SECS.TWENTY_MINUTES,
      stopCount: 2,
      finished: false,
    },
  },
  eventsById: {
    dEADb33F: {
      eventsToday: 1,
      timeStamps: [123456789],
    },
  },
};

// const updateSinglePropertyById = (state, id, propUpdater) =>
//   ({ [id]: Object.assign({ ...state.byId[id] }, propUpdater(state.byId[id])) });
const shouldStop = cntr => cntr.count >= cntr.stopCount;

const counterIncrementer = cntr => ({ ...cntr, count: cntr.count + 1 });
// ActiveOnly selector, try later for reuse, might not help much and probably slow

const counterStopper = cntr => ({
  ...cntr, finished: shouldStop(cntr), isActive: !shouldStop(cntr),
});

const updateAllActive = (state, propUpdater) => {
  const result = state.activeIds.reduce((item, id) => (
    {
      [id]: propUpdater(state.byId[id]),
    }), {});
  return result;
};

// TODO: Find the shared operations that can be pulled out into individual funcs
// - Certainly some func that checks activeIds & update globalClock.isTicking
// TODO: Flatten when confirmed working
const incrementActiveCounters = state => ({
  ...state,
  byId: {
    ...state.byId,
    ...updateAllActive(state, counterIncrementer),
  },
});

const updateActiveIds = state => ({
  ...state,
  activeIds: state.activeIds.filter(id => state.byId[id].isActive),
});

const deactivateFinishedCounters = state =>
  ({
    ...state,
    byId: {
      ...state.byId,
      ...updateAllActive(state, counterStopper),
    },
  });

// TODO: Flatten & Pull out reusable operations
const deactivateCounter = (state, id) => {
  const oldClk = state.byId[id];
  const newClk = { [id]: { ...oldClk, isActive: false } };
  const byId = { ...state.byId, ...newClk };
  const activeIds = state.activeIds.filter(currId => currId !== id);
  return {
    ...state,
    activeIds,
    byId,
  };
};

// TODO: Flatten & Pull out reusable blocks
const activateCounter = (state, id) => {
  const oldClk = state.byId[id];
  if (oldClk.markReached) return state;
  const newClk = { [id]: { ...oldClk, isActive: true } };
  const byId = { ...state.byId, ...newClk };
  const activeIds = state.activeIds.concat(id);
  return {
    ...state,
    activeIds,
    byId,
  };
};

const tickActiveCounters = state => ((
  updateActiveIds(( // Lastly update activeIds: using updated counter props
    deactivateFinishedCounters(( // Update isActive, markReached on cntrs
      incrementActiveCounters(state) // But first, increment counters
    ))
  ))
));

// TODO: Flatten & Pull out reusable blocks
const zeroCounter = (state, id) => {
  const oldClk = state.byId[id];
  const newClk = { [id]: { ...oldClk, count: 0 } };
  const byId = { ...state.byId, ...newClk };
  return { ...state, byId };
};

const resetFinishedFlag = (state, id) => {
  const oldClk = state.byId[id];
  const newClk = { [id]: { ...oldClk, markReached: false } };
  const byId = { ...state.byId, ...newClk };
  return { ...state, byId };
};

const resetCounter = (state, id) =>
  resetFinishedFlag(zeroCounter(state, id), id);

/** Reducer for all state objects related to the many types of counter based widgets --
 * -- that will be used in the future.
 * Each state object uses this data model:
 *   id: number,
 *   seconds: number,
 *   isActive: bool,
 *   clockType: string,
 *   timeMark: number (epoch timestamp, or seconds to reach),
 *   name: The name given to the clock (future update)
 * clockID is somekind of either uint or string of fixed chars, --
 * -- a UUID tied to each widget to manage data relations.
 * seconds: all counters will use a float number as the primary unit --
 * of data to display time, be it as a timer, stopwatch, or a regular counter.
 * isActive: A boolean to be used when updating time. Some widgets --
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
    case TICK_COUNTER:
      // debugger; // eslint-disable-line
      // return deactivateFinishedCounters(tickClocks(state));
      return tickActiveCounters(state);
    case DEACTIVATE_COUNTER:
      return deactivateCounter(state, action.id);
    case ACTIVATE_COUNTER:
      return activateCounter(state, action.id);
    case RESET_COUNTER:
      return resetCounter(state, action.id);
    // case SET_MARK:
    //   return { ...state, timeMark: action.timeMark };
    // case SET_SECONDS:
    //   return { ...state, seconds: action.seconds };
    // case START_CLOCK:
    //   return { ...state, isActive: true };
    default:
      return state;
  }
};

export default clocksReducer;
