// Reducers receive data from Action Creators as Action objects.
// These functions reduce the Action objects to simple state changes for the store.

import {
  // DECREMENT_SECONDS,
  // INC_SECONDS,
  CLOCK_TICK,
  RESET_CLOCK,
  // SET_MARK,
  // SET_SECONDS,
  // START_CLOCK,
  DEACTIVATE_CLOCK,
  ACTIVATE_CLOCK,
  // ADD_CLOCK,
  // REMOVE_CLOCK,
} from '../constants/action-types';
import CLK_TYPE from '../constants/clock-types';
import SECS from '../constants/time-constants';
// import {
//   tickClocks,
//   stopClockWithID,
// } from './helpers/clocks-reducer-helpers';

/*
//Un-Normalized State
const initState = {
  period: 1,
  isTicking: true,
  clocks: [{
    id: 'dEADb33F',
    seconds: 0,
    isActive: true,
    type: CLK_TYPE.POMMODORO,
    timeMark: SECS.TWENTY_MINUTES,
    markReached: false,
  }],
};
*/
// Properly normalize with selectors from http://bit.ly/2Mx8Npu
const initState = {
  globalClock: {
    period: 1,
    isTicking: true,
  },
  activeIds: ['dEADb33F'],
  allIds: ['dEADb33F'],
  byId: {
    dEADb33F: {
      id: 'dEADb33F',
      seconds: 0,
      isActive: true,
      type: CLK_TYPE.POMMODORO,
      // timeMark: SECS.TWENTY_MINUTES,
      timeMark: 2,
      markReached: false,
    },
  },
};

/*
// ActiveOnly selector, try later for reuse, might not help much and probably slow
const activeOnly = (state) => {
  const activeClks = state.activeIds.reduce((clks, id) => ({
    [id]: Object.assign({}, clks[id]),
  }));
  console.log('activeOnly = \n', activeClks);
  return activeClks;
};
*/

// TODO: Find the shared operations that can be pulled out into individual funcs
// - Certainly some func that checks activeIds & update globalClock.isTicking
// TODO: Flatten when confirmed working
const tickClocks = (state) => {
  const newActvClks = state.activeIds.reduce((clks, id) => {
    const clk = state.byId[id];
    // console.log('incAct.clk = ', clk);
    const seconds = clk.seconds + 1;
    const markReached = seconds >= clk.timeMark;
    // console.log('incActive.seconds = ', seconds);
    const newClk = {
      [id]: {
        ...clk,
        seconds,
        markReached,
        isActive: !markReached,
      },
    };
    // console.log('incActive.newClk = ', newClk);
    return newClk;
  }, {});
  const byId = { ...state.byId, ...newActvClks };
  const newState = { ...state, byId };
  // console.log('INC_SECONDS.newState:\n', newState);
  return newState;
};

// TODO: Flatten when confirmed working
const deactivateExpired = (state) => {
  const expiredIds = state.activeIds.filter(id => !state.byId[id].isActive);
  const activeIds = state.activeIds.filter((id) => {
    const idExpired = expiredIds.includes(id);
    // !expiredIds.has(id)
    return !idExpired;
  });
  const isTicking = activeIds.length > 0;
  return {
    ...state,
    globalClock: { period: state.globalClock.period, isTicking },
    activeIds,
  };
};

// TODO: Flatten & Pull out reusable operations
const deactivateClockOfId = (state, id) => {
  const oldClk = state.byId[id];
  const newClk = { [id]: { ...oldClk, isActive: false } };
  const byId = { ...state.byId, ...newClk };
  const activeIds = state.activeIds.filter(currId => currId !== id);
  const isTicking = activeIds > 0;
  const globalClock = { period: state.globalClock.period, isTicking };
  return {
    ...state,
    activeIds,
    byId,
    globalClock,
  };
};

// TODO: Flatten & Pull out reusable blocks
const activateClockOfId = (state, id) => {
  const oldClk = state.byId[id];
  if (oldClk.markReached) return state;
  const newClk = { [id]: { ...oldClk, isActive: true } };
  const byId = { ...state.byId, ...newClk };
  const activeIds = state.activeIds.concat(id);
  const isTicking = true;
  const globalClock = { period: state.globalClock.period, isTicking };
  return {
    ...state,
    activeIds,
    byId,
    globalClock,
  };
};

// TODO: Flatten & Pull out reusable blocks
const zeroSecondsOfClockOfId = (state, id) => {
  const oldClk = state.byId[id];
  const newClk = { [id]: { ...oldClk, seconds: 0 } };
  const byId = { ...state.byId, ...newClk };
  return { ...state, byId };
};

const resetMarkReached = (state, id) => {
  const oldClk = state.byId[id];
  const newClk = { [id]: { ...oldClk, markReached: false } };
  const byId = { ...state.byId, ...newClk };
  return { ...state, byId };
};

/** Reducer for all state objects related to the many types of clocks widgets --
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
      return deactivateExpired(tickClocks(state));
    case DEACTIVATE_CLOCK:
      return deactivateClockOfId(state, action.id);
    case ACTIVATE_CLOCK:
      return activateClockOfId(state, action.id);
    case RESET_CLOCK:
      return resetMarkReached(zeroSecondsOfClockOfId(state, action.id), action.id);
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
