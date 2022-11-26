import { configureStore } from '@reduxjs/toolkit';
import reducers from '../../reducers/combineReducers';

const store = configureStore({ reducer: reducers });

export default store;
