import { createSlice } from '@reduxjs/toolkit';
import requestGraphs from '../../api/dashboard';

const initialState = {
  fetching: false,
  success: null,
  error: null,
  graphs: null,
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchingGraphs(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchGraphsSuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        graphs: data.filter(
          (graph) => graph.user_id === Number(localStorage.getItem('userId'))
        ),
        error: null,
      };
    },

    fetchGraphsError(state, action) {
      return {
        ...state,
        fetching: false,
        error: JSON.parse(action.payload),
        success: null,
      };
    },
  },
});

export const {
  fetchingGraphs,
  fetchGraphsSuccess,
  fetchGraphsError,
} = dashboard.actions;

export default dashboard.reducer;

export const getGraphs = () => async (dispatch) => {
  dispatch(fetchingGraphs());
  try {
    const graphsResponse = await requestGraphs();
    dispatch(fetchGraphsSuccess(JSON.stringify(graphsResponse)));
  } catch (error) {
    dispatch(fetchGraphsError(JSON.stringify(error)));
  }
};
