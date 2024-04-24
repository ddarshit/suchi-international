import { configureStore,combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import navbarReducer from '../features/navbarSlice'
import FilterDialogueReducer from '../features/filterDialogue'
import apiReducer from '../features/apiSlice'
import toastReducer from '../features/toastSlice';

const combineReducer= combineReducers({
  navbar: navbarReducer,
  filterDialogue:FilterDialogueReducer,
  api:apiReducer,
  toast:toastReducer,
})

export const store = configureStore({
  reducer: combineReducer
});
