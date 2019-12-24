import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import theme from '../../app/theme';
import useWindowSize from '../../utils/useWindowSize';

const ViewGraph = () => {
  const size = useWindowSize();
  const { labels, datasets, title } = useSelector((state) => state.createGraph);

  const graphData = {
    labels,
    datasets: [
      {
        label: datasets[0].label,
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: datasets[0].data,
      },
    ],
  };

  const graphOptions = {
    maintainAspectRatio: false,
    title: {
      display: true,
      fontColor: theme.palette.text.secondary,
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: 3 * theme.typography.fontSize,
      fontStyle: 'normal',
      text: title,
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
  };

  return (
    <Box
      height={size.width / size.height > 0.8 ? size.height - 200 : size.width}
    >
      <Radar data={graphData} options={graphOptions} />
    </Box>
  );
};
export default ViewGraph;
