import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Box, Card, makeStyles, CardContent } from '@material-ui/core';
import { useSelector } from 'react-redux';
import theme from '../../app/theme';

const useStyles = makeStyles({
  card: {
    minWidth: 960,
  },
});

const Graph = ({ id }) => {
  const classes = useStyles();

  const {
    graph_name: title,
    graph_info: { labels, datasets },
  } = useSelector((state) =>
    state.dashboard.graphs.find((graph) => graph.id === id)
  );

  const graphData = {
    labels,
    datasets: JSON.parse(JSON.stringify(datasets)),
  };

  const graphOptions = {
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
        min: 0,
        fontColor: theme.palette.text.secondary,
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: 0.75 * theme.typography.fontSize,
      },

      gridLines: {
        color: theme.palette.grey['300'],
      },
    },
  };

  return (
    <Box component={Link} to={`/graphs/${id}`} mt={5}>
      <Card className={classes.card}>
        <CardContent>
          <Radar data={graphData} options={graphOptions} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Graph;
