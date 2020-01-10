import { createSlice } from '@reduxjs/toolkit';
import { remove } from '../../../api/graph';

const initialState = {
  deleting: false,
  error: null,
  success: null,
};

const removeGraph = createSlice({
  name: 'removeGraph',
  initialState,
  reducers: {
    deletingGraph(state) {
      return {
        ...state,
        deleting: true,
        error: null,
        success: null,
      };
    },

    deleteGraphSuccess(state, action) {
      return {
        ...state,
        deleting: false,
        success: JSON.parse(action.payload),
        error: null,
      };
    },

    deleteGraphError(state, action) {
      return {
        ...state,
        deleting: false,
        success: null,
        error: JSON.parse(action.payload),
      };
    },

    resetSuccess(state) {
      return {
        ...state,
        success: null,
      };
    },
  },
});

export const {
  deletingGraph,
  deleteGraphSuccess,
  deleteGraphError,
  resetSuccess,
} = removeGraph.actions;

export default removeGraph.reducer;

export const deleteGraph = (id) => async (dispatch) => {
  dispatch(deletingGraph());
  try {
    const deletedGraph = await remove(id);
    dispatch(deleteGraphSuccess(JSON.stringify(deletedGraph)));
  } catch (error) {
    dispatch(deleteGraphError(JSON.stringify(error)));
  }
};
