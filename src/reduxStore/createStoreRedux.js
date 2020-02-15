import RootReducer from '../reducer/rootReducer';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import thunk from 'redux-thunk';

import StateLoader from "./stateLoader"

const stateLoader = new StateLoader();

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const composeEnhancers =
  typeof window === 'object' && !isProduction &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;




const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);


var store = createStore(
  RootReducer,
  stateLoader.loadState()
  ,enhancer
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

export {
  store
}