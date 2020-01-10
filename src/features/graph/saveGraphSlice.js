import { createSlice } from '@reduxjs/toolkit';
import { saveGraph } from '../../api/graph';

const initialState = {
  posting: false,
  error: null,
  success: null,
};

const addGraph = createSlice({
  name: 'addGraph',
  initialState,
  reducers: {
    postingGraph(state) {
      return {
        ...state,
        posting: true,
        error: null,
        success: null,
      };
    },

    postGraphSuccess(state, action) {
      return {
        ...state,
        posting: false,
        success: JSON.parse(action.payload),
        error: null,
      };
    },

    postGraphError(state, action) {
      return {
        ...state,
        posting: false,
        success: null,
        error: JSON.parse(action.payload),
      };
    },
  },
});

export const {
  postingGraph,
  postGraphSuccess,
  postGraphError,
} = addGraph.actions;

export default addGraph.reducer;

export const postGraph = (graph) => async (dispatch) => {
  dispatch(postingGraph());
  try {
    const newGraphData = await saveGraph(graph);
    dispatch(postGraphSuccess(JSON.stringify(newGraphData)));
  } catch (error) {
    dispatch(postGraphError(JSON.stringify(error)));
  }
};
