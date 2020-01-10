import React, { useEffect, useRef, useState } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { Radar } from 'react-chartjs-2';
import { makeStyles, Box, Fab } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';
import theme from '../../app/theme';
import useWindowSize from '../../utils/useWindowSize';
import EditBar from './edit/EditBar';
import { switchGraph } from './graphSlice';

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
  const { labels, datasets, title } = useSelector(
    (state) => state.createGraph.present
  );

  const [canvas, setCanvas] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { graphs } = useSelector((state) => state.dashboard);
  const { id } = useParams();

  useEffect(() => {
    if (id && graphs) {
      dispatch(switchGraph(graphs.find((graph) => graph.id === Number(id))));
      dispatch(UndoActionCreators.clearHistory());
    }
  }, [dispatch, graphs, id]);

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
