import {
  STOP_GLOBAL_TIMER,
  START_GLOBAL_TIMER,
} from '../constants/action-types';

const initState = {
  period: 1,
  isActive: true,
};

const globalTimerReducer = (state = initState, action) => {
  switch (action.type) {
    case STOP_GLOBAL_TIMER:
      return { ...state, isActive: false };
    case START_GLOBAL_TIMER:
      return { ...state, isActive: false };
    default:
      return state;
  }
};

export default globalTimerReducer;
