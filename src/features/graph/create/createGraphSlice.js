import { createSlice } from '@reduxjs/toolkit';
import theme from '../../../app/theme';
import colors from '../../../utils/colors';

const initialState = {
  labels: JSON.parse(localStorage.getItem('graphState'))
    ? JSON.parse(localStorage.getItem('graphState')).labels
    : ['', '', ''],
  datasets: JSON.parse(localStorage.getItem('graphState'))
    ? JSON.parse(localStorage.getItem('graphState')).datasets
    : [
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
  title: JSON.parse(localStorage.getItem('graphState'))
    ? JSON.parse(localStorage.getItem('graphState')).title
    : '',
};

const createGraph = createSlice({
  name: 'createGraph',
  initialState,
  reducers: {
    addDataset(state) {
      const baseColor = Object.keys(colors)[
        (state.datasets.length * 3) % Object.keys(colors).length
      ];

      return {
        ...state,
        datasets: [
          ...state.datasets,
          {
            label: `Dataset ${state.datasets.length + 1}`,
            backgroundColor: `${colors[baseColor]['500']}40`,
            borderColor: colors[baseColor]['500'],
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

    changeTitle(state, action) {
      return {
        ...state,
        title: action.payload,
      };
    },

    addAxis(state) {
      return {
        ...state,
        labels: [...state.labels, ''],
        datasets: state.datasets.map((dataset) => {
          return {
            ...dataset,
            data: [...dataset.data, ''],
          };
        }),
      };
    },

    changeAxis(state, action) {
      const { index, label } = action.payload;

      return {
        ...state,
        labels: Object.assign([...state.labels], {
          [index]: label,
        }),
      };
    },

    removeAxis(state, action) {
      return {
        ...state,
        labels: state.labels.filter(
          (label) => state.labels.indexOf(label) !== action.payload
        ),
        datasets: state.datasets.map((dataset) => {
          return {
            ...dataset,
            data: dataset.data.filter(
              (value) => dataset.data.indexOf(value) !== action.payload
            ),
          };
        }),
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

    changeColor(state, action) {
      const { index, color } = action.payload;

      return {
        ...state,
        datasets: Object.assign([...state.datasets], {
          [index]: {
            ...state.datasets[index],
            borderColor: color.hex,
            backgroundColor: `${color.hex}40`,
            pointBackgroundColor: color.hex,
            pointHoverBorderColor: color.hex,
          },
        }),
      };
    },
  },
});

export const {
  addDataset,
  removeDataset,
  changeTitle,
  addAxis,
  changeAxis,
  removeAxis,
  changeDatasetLabel,
  changeDatasetData,
  changeColor,
} = createGraph.actions;

export default createGraph.reducer;
