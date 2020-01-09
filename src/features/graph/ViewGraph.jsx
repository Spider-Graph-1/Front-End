import React, { useEffect, useRef, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { makeStyles, Box, Fab, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { saveAs } from 'file-saver';
import theme from '../../app/theme';
import useWindowSize from '../../utils/useWindowSize';
import EditBar from './edit/EditBar';
import axiosWithAuth from '../../api/utils/axiosWithAuth';

const useStyles = makeStyles(() => ({
  downloadButton: {
    position: 'fixed',
    bottom: '2rem',
    left: '2rem',
  },
}));

const ViewGraph = () => {
  const graphCanvas = useRef(null);
  const classes = useStyles();
  const size = useWindowSize();
  const { labels, datasets, title, stepSize } = useSelector(
    (state) => state.createGraph.present
  );

  const [canvas, setCanvas] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (title !== '') {
      localStorage.setItem(
        'graphState',
        JSON.stringify({ labels, datasets, title })
      );
    }
  }, [datasets, labels, title]);

  const graphData = {
    labels,
    datasets: JSON.parse(JSON.stringify(datasets)),
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
        min: 0,
        fontColor: theme.palette.text.secondary,
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: 0.75 * theme.typography.fontSize,
      },

      gridLines: {
        color: theme.palette.grey['300'],
      },
    },

    animation: {
      onComplete: () => {
        setCanvas(graphCanvas.current.chartInstance.canvas);
        setDisabled(false);
      },
    },
  };

  return (
    <Box display="flex" flexDirection="row-reverse" justifyContent="center">
      <Fab
        onClick={() =>
          canvas.toBlob((blob) =>
            saveAs(blob, `${title.replace(/ /g, '_').toLowerCase()}.png`)
          )
        }
        color="primary"
        aria-label="download graph"
        className={classes.downloadButton}
        disabled={disabled}
      >
        <CloudDownloadIcon />
      </Fab>
      <EditBar />
      <Box
        width="100%"
        height={size.width / size.height > 0.8 ? size.height - 100 : size.width}
        pt={6}
      >
        <Radar ref={graphCanvas} data={graphData} options={graphOptions} />
      </Box>
    </Box>
  );
};

export default ViewGraph;
