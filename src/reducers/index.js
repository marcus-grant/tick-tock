// Combine >= 1 reducer funcs & export through redux.combineReducer
import { combineReducers } from 'redux';

import clocks from './clocks-reducer';
import globalTimer from './global-timer-reducer';

export default combineReducers({ globalTimer, clocks });
// TODO: Add a timestamps or some kind of logging state to track timer start/ends,
// -- pommodoro start/ends along with time they ended, etc.
// TODO: Add some kind of global state that determines the clocking period.
// This would be used to dynamically change how frequently the app updates data.
// Could be useful to reduce CPU usage based on demand.

// NOTE: If other reducers are created, combine them like so...
// export default combineReducers({ count, 2ndReducer, 3rdReducer });
