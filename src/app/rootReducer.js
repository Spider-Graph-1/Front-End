// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Redux-Undo
import undoable from 'redux-undo';
// Reducers
import auth from '../features/auth/authSlice';
import createGraph from '../features/graph/graphSlice';

const rootReducer = combineReducers({
  auth,
  createGraph: undoable(createGraph),
});

export default rootReducer;
