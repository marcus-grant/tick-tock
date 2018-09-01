// Reducers receive data from Action Creators as Action objects.
// These functions reduce the Action objects to simple state changes for the store.

import {
  INCREMENT_TIMER,
  DECREMENT_TIMER,
  RESET_TIMER,
} from '../constants/action-types';

const initState = {
  secondsRemaining: 60,
};

const timerReducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT_TIMER:
      return { ...state, secondsRemaining: state.secondsRemaining + 1 };
    case DECREMENT_TIMER:
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case RESET_TIMER:
      return { ...state, secondsRemaining: action.seconds };
    default:
      return state;
  }
};

export default timerReducer;
