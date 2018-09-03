// ActionTypes get defined as constants in one place for ease of reference

// Imported in Actions & Reducers
// Prevents errors due to typos

// export const SET_SECONDS = 'SET_SEC'; // TODO: Redundant?
export const CLOCK_TICK = 'CLK_TICK';
export const SET_SECONDS = 'SET_SEC';
export const SET_MARK = 'SET_MARK';
export const STOP_CLOCK = 'STOP_CLK';
export const START_CLOCK = 'START_CLK';
export const ADD_CLOCK = 'ADD_CLK';
export const REMOVE_CLOCK = 'DEL_CLK';
export const STOP_CLOCK_TICK = 'STOP_TICK';
export const START_CLOCK_TICK = 'START_TICK';

// Timestamp action types
export const ADD_TIMESTAMP = 'ADD_STAMP';
export const REMOVE_TIMESTAMP = 'DEL_STAMP';
