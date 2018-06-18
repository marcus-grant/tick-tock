// Reducers receive info from Actions by way of "type" & "payload" keys
// There are functions that get executed by them according to what they're defined

// Here when "INCREMENT_NUM" action is received,
// the reducer func will increment the stored value

import {
  INCREMENT_TIMER,
  DECREMENT_TIMER,
  INCREMENT_NUM,
  DECREMENT_NUM,
  RESET,
} from '../constants/ActionTypes';

export default function reducer(paramState = 0, action) {
  const state = paramState;
  switch (action.type) {
    case INCREMENT_TIMER:
    case INCREMENT_NUM:
      return state + 1;
    case DECREMENT_TIMER:
    case DECREMENT_NUM:
      return state - 1;
    case RESET:
      return action.payload;
    default:
  } return state;
}
