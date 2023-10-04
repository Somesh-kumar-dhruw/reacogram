import { createStore } from 'redux';
import { combineReducer } from './combineReducer'; // Import combineReducers

export const store = createStore(
    combineReducer // Use combineReducers to create your store
);
