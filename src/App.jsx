import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import Counter from './components/Counter';
import TimerContainer from './containers/TimerContainer';
import reducers from './reducers/reducers';

// import './styles/main.scss';

const createStoreWithMiddleWare = applyMiddleware()(createStore);
const store = createStoreWithMiddleWare(reducers);

const App = () => (
  <Provider store={store}>
    <h1>Tick Tock</h1>
    <TimerContainer text="Test" />
  </Provider>
);

// until webpack is fixed use this placeholder
export default App;
