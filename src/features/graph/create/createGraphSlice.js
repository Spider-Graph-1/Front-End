import { createSlice } from '@reduxjs/toolkit';
import theme from '../../../app/theme';

const initialState = {
  data: {
    labels: [''],
    datasets: [
      {
        label: '',
        backgroundColor: theme.palette.background,
        borderColor: theme.palette.primary.main,
        borderDash: [],
        pointBackgroundColor: theme.palette.primary.light,
        pointBorderColor: theme.palette.primary.dark,
        pointHoverBackgroundColor: theme.palette.secondary.main,
        pointHoverBorderColor: theme.palette.secondary.light,
        data: [0],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    title: {
      display: true,
      fontColor: theme.palette.text.secondary,
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: 3.25 * theme.typography.fontSize,
      fontStyle: 'normal',
      text: '',
    },
    layout: {
      padding: {
        top: 50,
      },
    },
    legend: {
      labels: {
        fontColor: theme.palette.text.primary,
        fontFamily: theme.typography.h2.fontFamily,
        fontSize: 1.375 * theme.typography.fontSize,
      },
    },
    tooltips: {
      backgroundColor: theme.palette.secondary.dark,
      titleFontFamily: theme.typography.body1.fontFamily,
      titleFontSize: 1.125 * theme.typography.fontSize,
      titleFontStyle: theme.typography.body1.fontStyle,
      bodyFontFamily: theme.typography.body1.fontFamily,
      bodyFontSize: 1.125 * theme.typography.fontSize,
    },
    scale: {
      pointLabels: {
        fontColor: theme.palette.text.primary,
        fontFamily: theme.typography.body1.fontFamily,
        fontSize: 1.25 * theme.typography.fontSize,
      },
      ticks: {
        fontColor: theme.palette.text.secondary,
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: 0.75 * theme.typography.fontSize,
      },
    },
  },
};

const createGraph = createSlice({
  name: 'addGraph',
  initialState,
  reducers: {},
});
