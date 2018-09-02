import React from 'react';
import { Provider } from 'react-redux';
import { createStore /* applyMiddleware */ } from 'redux';

import reducers from '../reducers';
import GlobalTimer from '../containers/GlobalTimer';
import ClockContainer from './ClockContainer';

// import '../styles/main.scss';

// TODO: add something like the link below to change code behavior based
// on if development mode is running on webpack.
// link: https://stackoverflow.com/questions/28572380/conditional-build-based-on-environment-using-webpack
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const App = () => (
  <Provider store={store}>
    <GlobalTimer>
      <ClockContainer />
    </GlobalTimer>
  </Provider>
);

export default App;
