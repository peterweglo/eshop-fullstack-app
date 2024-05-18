import { createStore, combineReducers } from 'redux';
import initialState from './InitialState';
import productsReducer from './productsReducer';

const subreducers = {
  products: productsReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
