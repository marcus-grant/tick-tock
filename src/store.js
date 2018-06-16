import { createStore } from 'redux';
import reducer from './reducers'; // Get state from reducers

const store = createStore(reducer); // Create the store from state from reducers

export default store;
