import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Backdrop, CircularProgress, Fade } from '@material-ui/core';
import CreateGraph from '../graph/create/CreateGraph';
import GraphTitleAxis from '../../app/Brett/GraphTitleAxis';
import { getGraphs } from './dashboardSlice';
import { clearGraph } from '../graph/graphSlice';
import Graph from '../graph/Graph';

const ViewDashboard = () => {
  const dispatch = useDispatch();
  const { fetching, graphs } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(clearGraph());
    dispatch(getGraphs());
  }, [dispatch]);

  if (fetching) {
    return (
      <Backdrop open invisible>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (graphs) {
    return (
      <Fade in>
        <Box my={10}>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap">
            {graphs.map((graph) => (
              <Graph key={graph.id} id={graph.id} />
            ))}
          </Box>
          <CreateGraph />
        </Box>
      </Fade>
    );
  }

  return <GraphTitleAxis />;
};

export default ViewDashboard;
