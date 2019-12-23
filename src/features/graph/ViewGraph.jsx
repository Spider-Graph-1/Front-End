import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { Box } from '@material-ui/core';
import theme from '../../app/theme';
import useWindowSize from '../../utils/useWindowSize';

const initialFontSizes = {
  title: 3.25 * theme.typography.fontSize,
  keys: 1.375 * theme.typography.fontSize,
  pointLabels: 1.25 * theme.typography.fontSize,
  ticks: 0.75 * theme.typography.fontSize,
  tooltip: 1.125 * theme.typography.fontSize,
};

const ViewGraph = () => {
  const size = useWindowSize();
  const [fontSizes, setFontSizes] = useState(initialFontSizes);

  useEffect(() => {
    if (size.width / size.height < 0.8) {
      setFontSizes((sizes) => {
        return {
          ...sizes,
          title: 2.625 * theme.typography.fontSize,
          keys: 1.25 * theme.typography.fontSize,
          pointLabels: 1.125 * theme.typography.fontSize,
          tooltip: 0.875 * theme.typography.fontSize,
        };
      });
    } else {
      setFontSizes(initialFontSizes);
    }
  }, [size.height, size.width]);

  const data = {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running',
    ],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderDash: [],
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    title: {
      display: true,
      fontColor: theme.palette.text.secondary,
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: fontSizes.title,
      fontStyle: 'normal',
      text: 'Basic Spider Graph',
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
        fontSize: fontSizes.keys,
      },
    },
    tooltips: {
      backgroundColor: theme.palette.secondary.dark,
      titleFontFamily: theme.typography.body1.fontFamily,
      titleFontSize: fontSizes.tooltip,
      titleFontStyle: theme.typography.body1.fontStyle,
      bodyFontFamily: theme.typography.body1.fontFamily,
      bodyFontSize: fontSizes.tooltip,
    },
    scale: {
      pointLabels: {
        fontColor: theme.palette.text.primary,
        fontFamily: theme.typography.body1.fontFamily,
        fontSize: fontSizes.pointLabels,
      },
      ticks: {
        fontColor: theme.palette.text.secondary,
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: fontSizes.ticks,
      },
    },
  };

  return (
    <Box
      height={size.width / size.height > 0.8 ? size.height - 200 : size.width}
    >
      <Radar data={data} options={options} />
    </Box>
  );
};
export default ViewGraph;
