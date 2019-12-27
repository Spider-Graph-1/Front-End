import { createSlice } from '@reduxjs/toolkit';
import theme from '../../../app/theme';
import colors from '../../../utils/colors';

const initialState = {
  labels: ['', '', ''],
  datasets: [
    {
      label: '',
      backgroundColor: `${theme.palette.primary.light}40`,
      borderColor: theme.palette.primary.main,
      borderDash: [],
      pointBackgroundColor: theme.palette.primary.dark,
      pointBorderColor: theme.palette.grey['50'],
      pointHoverBackgroundColor: theme.palette.grey['50'],
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
      const baseColor = Object.keys(colors)[
        Math.floor(Math.random() * Object.keys(colors).length - 1) + 1
      ];

      return {
        ...state,
        datasets: [
          ...state.datasets,
          {
            label: '',
            backgroundColor: `${colors[baseColor]['500']}40`,
            borderColor: colors[baseColor]['700'],
            borderDash: [],
            pointBackgroundColor: colors[baseColor]['500'],
            pointBorderColor: colors.grey['50'],
            pointHoverBackgroundColor: colors.grey['50'],
            pointHoverBorderColor: colors[baseColor]['700'],
            data: [...Array(state.labels.length)].map(() => ''),
          },
        ],
      };
    },
    removeDataset(state, action) {
      return {
        ...state,
        datasets: state.datasets.filter(
          (dataset) => state.datasets.indexOf(dataset) !== action.payload
        ),
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
  removeDataset,
  changeDatasetLabel,
  changeDatasetData,
} = createGraph.actions;

export default createGraph.reducer;
