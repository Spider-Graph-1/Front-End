// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Redux-Undo
import undoable from 'redux-undo';
// Reducers
import auth from '../features/auth/authSlice';
import createGraph from '../features/graph/graphSlice';
import dashboard from '../features/dashboard/dashboardSlice';

const rootReducer = combineReducers({
  auth,
  createGraph: undoable(createGraph),
  dashboard,
});

export default rootReducer;
