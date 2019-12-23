// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import auth from '../features/auth/authSlice';
import createGraph from '../features/graph/create/createGraphSlice';

const rootReducer = combineReducers({
  auth,
  createGraph,
});

export default rootReducer;
