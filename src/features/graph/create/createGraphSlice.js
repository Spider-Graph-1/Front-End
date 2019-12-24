import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  labels: ['', '', ''],
  datasets: [
    {
      label: '',
      data: [],
    },
  ],
  title: '',
};

const createGraph = createSlice({
  name: 'createGraph',
  initialState,
  reducers: {
    structureGraph(state, action) {
      const { labels, title } = action.payload;

      return {
        ...state,
        labels,
        title,
      };
    },
    addGraphData(state, action) {
      const { label, data } = action.payload;

      return {
        ...state,
        datasets: [
          {
            ...state.datasets[0],
            label,
            data,
          },
        ],
      };
    },
  },
});

export const { structureGraph, addGraphData } = createGraph.actions;

export default createGraph.reducer;
