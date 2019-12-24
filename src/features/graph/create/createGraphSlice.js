import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  labels: ['', '', ''],
  datasets: [
    {
      label: '',
      data: [0],
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
      const { dataSetLabel, data } = action.payload;

      return {
        ...state,
        datasets: [
          {
            ...state.datasets[0],
            label: dataSetLabel,
            data,
          },
        ],
      };
    },
  },
});

export const { structureGraph, addGraphData } = createGraph.actions;

export default createGraph.reducer;
