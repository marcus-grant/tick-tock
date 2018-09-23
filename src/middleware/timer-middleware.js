export const START_TIMER = 'START_TMR';
export const STOP_TIMER = 'STOP_TMR';
export const COUNTERS_TIMER = 'CNTRS';

// TODO: Add clock edge parameter to either immediately start on rising edge,
// ... or to start on next falling edge.

const globalTimers = {};

/**
 * Validates that a valid action was given to the timer middleware.
 * @param {string, function} action  - A redux action to stop or start the timer
 */
const validateTimerAction = (action) => {
  if (!action) {
    throw new Error('Missing timer dispatch parameter. Action required');
  }
  if (typeof action !== 'string' && typeof action !== 'function') {
    throw new Error('Timer middleware requires its action to be a string or function');
  }
};

/**
 * Validates that a valid interval was given to the timer middleware.
 * @param {number} action  - A redux action payload that is validated as number
 */
const validateTimerInterval = (interval) => {
  if (!interval) {
    throw new Error('Missing timer dispatch parameter. Interval required.');
  }
  if (typeof interval !== 'number') {
    throw new Error('Timer middleware action interval must be a number');
  }
};

const startTimer = ({ dispatch }, { name, interval, timerAction }) => {
  // Exit early if timer already set
  if (globalTimers[name]) return;

  // Validate params
  validateTimerAction(timerAction);
  validateTimerInterval(interval);

  // Clear timer interval if already in progress
  // if (globalTimers[name] !== null) {
  //   // clearInterval(globalTimers[name]);
  //   // We'll simply return if the same timer is already set up
  //   return;
  // }

  // Setup the action  based on type
  const timerFunc =
    typeof timerAction === 'string'
      ? () => dispatch({ type: timerAction })
      : () => dispatch(timerAction());

  // Create interval using action
  globalTimers[name] = setInterval(timerFunc, interval);
};

const stopTimer = ({ name }) => {
  if (globalTimers[name] !== null) {
    clearInterval(globalTimers[name]);
    globalTimers[name] = null;
  }
};

const timerMiddleware = state => next => (action) => {
  switch (action.type) {
    case START_TIMER:
      return startTimer(state, action.payload);
    case STOP_TIMER:
      return stopTimer(action.payload);
    default:
      return next(action);
  }
};

export default timerMiddleware;
