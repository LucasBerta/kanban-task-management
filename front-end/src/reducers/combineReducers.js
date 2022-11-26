import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './themeReducer';
import sidebarReducer from './sidebarReducer';
import boardReducer from './boardReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  theme: themeReducer,
  sidebar: sidebarReducer,
  board: boardReducer,
  snackbar: snackbarReducer,
});
