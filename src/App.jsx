import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Counter from './components/Counter';
import reducers from './reducers/reducers';

// import './styles/main.scss';

const createStoreWithMiddleWare = applyMiddleware()(createStore);
const store = createStoreWithMiddleWare(reducers);

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
