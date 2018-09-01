import React from 'react';
import { Provider } from 'react-redux';
import { createStore /* applyMiddleware */ } from 'redux';

// import Counter from './components/Counter';
import TimerContainer from './TimerContainer';
import reducer from '../reducers';

// import '../styles/main.scss';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
const store = createStore(reducer);

const App = () => {
  console.log('store state: ', store.getState());
  return (
    <Provider store={store}>
      <TimerContainer text="Test" />
    </Provider>
  );
};

export default App;
