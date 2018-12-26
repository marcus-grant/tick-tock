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
  eventsById: { dEADb33F: [new Date()] },
};

// const updateSinglePropertyById = (state, id, propUpdater) =>
//   ({ [id]: Object.assign({ ...state.byId[id] }, propUpdater(state.byId[id])) });
const shouldStop = cntr => cntr.count >= cntr.stopCount;

const counterIncrementer = cntr => ({ ...cntr, count: cntr.count + 1 });
// ActiveOnly selector, try later for reuse, might not help much and probably slow

const counterStopper = cntr => ({
  ...cntr, finished: shouldStop(cntr), isActive: !shouldStop(cntr),
});

const updateAllActive = (state,   propUpdater) => {
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

const deactivateFinishedCounters = (state) => {
  const finishedCounterIds = state.activeIds.filter(c => shouldStop(state.byId[c]));
  const newEvents = finishedCounterIds.reduce((acc, cur) => (
    { ...acc, [cur]: [...state.eventsById[cur], new Date()] }), {});
  console.log('New Events: ', newEvents);
  return ({
    ...state,
    byId: {
      ...state.byId,
      ...updateAllActive(state, counterStopper),
    },
    eventsById: {
      ...state.eventsById,
      ...newEvents,
    },
  });
};
  // ({
  //   ...state,
  //   byId: {
  //     ...state.byId,
  //     ...updateAllActive(state, counterStopper),
  //   },
  //   eventsById: {
  //     ...state.eventsById,
  //   },
  // });

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
