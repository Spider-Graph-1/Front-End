// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Redux-Undo
import undoable from 'redux-undo';
// Reducers
import auth from '../features/auth/authSlice';
import createGraph from '../features/graph/view/graphSlice';
import dashboard from '../features/dashboard/dashboardSlice';
import addGraph from '../features/graph/saveGraphSlice';
import changeGraph from '../features/graph/edit/editGraphSlice';
import removeGraph from '../features/graph/delete/deleteSlice';

const rootReducer = combineReducers({
  auth,
  createGraph: undoable(createGraph),
  dashboard,
  addGraph,
  changeGraph,
  removeGraph,
});

export default rootReducer;
