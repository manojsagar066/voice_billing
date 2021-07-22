import React from 'react';
import appReducer from './store/reducers/appReducer';
import { createStore, combineReducers } from "redux";
import {Provider} from 'react-redux';
import Navigator from './navigation/Navigator';

const rootReducer = combineReducers({
  app:appReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}

