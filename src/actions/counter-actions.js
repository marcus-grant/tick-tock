// Here is where all actions will be combined into one module
// Actions are payloads of data that gets sent to the app datastore
// They are the only source of info for the store

// Actions are triggered either by user through interactions or app events

// More on actions: https://redux.js.org/docs/basics/Actions.html

import { INCREMENT_NUM, DECREMENT_NUM, RESET } from '../constants/ActionTypes';

export function incrementNum(payload) {
  return {
    type: INCREMENT_NUM,
    payload,
  };
}

export function decrementNum(payload) {
  return {
    type: DECREMENT_NUM,
    payload,
  };
}

export function resetCounter(payload) {
  return {
    type: RESET,
    payload,
  };
}
