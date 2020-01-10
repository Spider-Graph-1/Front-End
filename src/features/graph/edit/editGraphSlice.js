import { createSlice } from '@reduxjs/toolkit';
import { editGraph } from '../../../api/graph';

const initialState = {
  putting: false,
  error: null,
  success: null,
};

const changeGraph = createSlice({
  name: 'changeGraph',
  initialState,
  reducers: {
    puttingGraph(state) {
      return {
        ...state,
        putting: true,
        error: null,
        success: null,
      };
    },

    putGraphSuccess(state, action) {
      return {
        ...state,
        posting: false,
        success: JSON.parse(action.payload),
        error: null,
      };
    },

    putGraphError(state, action) {
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
  puttingGraph,
  putGraphSuccess,
  putGraphError,
} = changeGraph.actions;

export default changeGraph.reducer;

export const putGraph = (id, graph) => async (dispatch) => {
  dispatch(puttingGraph());
  try {
    const newGraphData = await editGraph(id, graph);
    dispatch(putGraphSuccess(JSON.stringify(newGraphData)));
  } catch (error) {
    dispatch(putGraphError(JSON.stringify(error)));
  }
};
