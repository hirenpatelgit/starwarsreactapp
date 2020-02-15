import React from 'react';
import './App.css';
import RootRouter from './router/rootRouter';
import {
  Provider
} from 'react-redux';

import {
  store
} from './reduxStore/createStoreRedux';


function App() {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}

export default App;
