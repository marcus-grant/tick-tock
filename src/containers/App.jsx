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
// link: http://bit.ly/2IiGcYi
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(timerMiddleware),
);
/* eslint-enable */

const App = () => (
  <Provider store={store}>
    <CurrentCountersContainer />
  </Provider>
);

export default App;
