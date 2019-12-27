import { createSlice } from '@reduxjs/toolkit';
import theme from '../../../app/theme';

const initialState = {
  labels: ['', '', ''],
  datasets: [
    {
      label: '',
      backgroundColor: `${theme.palette.primary.light}60`,
      borderColor: theme.palette.primary.main,
      borderDash: [],
      pointBackgroundColor: theme.palette.primary.dark,
      pointBorderColor: theme.palette.primary.contrastText,
      pointHoverBackgroundColor: theme.palette.secondary.light,
      pointHoverBorderColor: theme.palette.secondary.dark,
      data: ['', '', ''],
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
    addDataField(state) {
      return {
        ...state,
        datasets: state.datasets.map((dataset) => {
          return {
            ...dataset,
            data: [...dataset.data, ''],
          };
        }),
      };
    },
    addDataset(state) {
      return {
        ...state,
        datasets: [
          ...state.datasets,
          {
            label: '',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            borderDash: [5, 5],
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [...Array(state.labels.length)].map(() => ''),
          },
        ],
      };
    },
    changeDatasetLabel(state, action) {
      const { index, label } = action.payload;

      return {
        ...state,
        datasets: Object.assign([...state.datasets], {
          [index]: {
            ...state.datasets[index],
            label,
          },
        }),
      };
    },
    changeDatasetData(state, action) {
      const { index, data } = action.payload;

      return {
        ...state,
        datasets: Object.assign([...state.datasets], {
          [index]: {
            ...state.datasets[index],
            data,
          },
        }),
      };
    },
  },
});

export const {
  structureGraph,
  addDataField,
  addDataset,
  changeDatasetLabel,
  changeDatasetData,
} = createGraph.actions;

export default createGraph.reducer;
