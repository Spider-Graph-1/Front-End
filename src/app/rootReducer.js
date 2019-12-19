// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import auth from '../features/auth/authSlice';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
