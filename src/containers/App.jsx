import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import timerMiddleware from '../middleware/timer-middleware';
import reducers from '../reducers';
// import GlobalTimer from '../containers/GlobalTimer';
import CurrentCountersContainer from './CurrentCountersContainer';

// import '../styles/main.scss';

// TODO: add something like the link below to change code behavior based
// on if development mode is running on webpack.
// link: https://stackoverflow.com/questions/28572380/conditional-build-based-on-environment-using-webpack
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(timerMiddleware),
);
/* eslint-enable */

<<<<<<< HEAD
const App = () => {
  console.log('store state: ', store.getState());
  return (
    <Provider store={store}>
      <TimerContainer text="Test" />
    </Provider>
  );
};
=======
const App = () => (
  <Provider store={store}>
    <CurrentCountersContainer />
  </Provider>
);
>>>>>>> master

export default App;
