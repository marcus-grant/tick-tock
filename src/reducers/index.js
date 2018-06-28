// Combine >= 1 reducer funcs & export through redux.combineReducer
import { combineReducers } from 'redux';

import count from './counter';
import timer from '../reducers/timer-reducer';

export default combineReducers({ timer, count });

// NOTE: If other reducers are created, combine them like so...
// export default combineReducers({ count, 2ndReducer, 3rdReducer });
