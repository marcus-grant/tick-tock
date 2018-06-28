import React from 'react';
import { Provider } from 'react-redux';
import { createStore /* applyMiddleware */ } from 'redux';

// import Counter from './components/Counter';
import TimerContainer from './TimerContainer';
import reducer from '../reducers';

// import '../styles/main.scss';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <cTimerContainer text="Test" />
  </Provider>
);

  // <div>
  //   <h1>Tick Tock</h1>
  //   <TimerContainer text="Test" />
  // </div>
// until webpack is fixed use this placeholder
export default App;
