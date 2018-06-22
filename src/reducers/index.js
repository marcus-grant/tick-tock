// Combine >= 1 reducer funcs & export through redux.combineReducer
import { combineReducers } from 'redux';

import count from './counter';
import timerActions from '../reducers/timer-reducer';

export default combineReducers({ timerActions, count });

// NOTE: If other reducers are created, combine them like so...
// export default combineReducers({ count, 2ndReducer, 3rdReducer });
