import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Backdrop, CircularProgress, Fade } from '@material-ui/core';
import CreateGraph from '../graph/create/CreateGraph';
import GraphTitleAxis from '../../app/Brett/GraphTitleAxis';
import { getGraphs } from './dashboardSlice';
import { clearGraph } from '../graph/view/graphSlice';
import Graph from './Graph';
import Delete from '../graph/delete/Delete';

const ViewDashboard = () => {
  const dispatch = useDispatch();
  const { fetching, graphs } = useSelector((state) => state.dashboard);
  const [open, setOpen] = useState(false);
  const [graphToDelete, setGraphToDelete] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      dispatch(getGraphs());
      dispatch(clearGraph());
    }
    setRefresh(false);
  }, [dispatch, refresh]);

  const deleteDialog = (id) => {
    setOpen(true);
    setGraphToDelete(id);
  };

  if (fetching) {
    return (
      <Backdrop open invisible>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (graphs && graphs.length > 0) {
    return (
      <>
        <Fade in>
          <Box my={10}>
            <Box display="flex" justifyContent="space-around" flexWrap="wrap">
              {graphs.map((graph) => (
                <Graph
                  key={graph.id}
                  id={graph.id}
                  deleteDialog={deleteDialog}
                />
              ))}
            </Box>
            <CreateGraph />
          </Box>
        </Fade>

        <Delete
          graphToDelete={graphToDelete}
          setGraphToDelete={setGraphToDelete}
          setOpen={setOpen}
          open={open}
          setRefresh={setRefresh}
        />
      </>
    );
  }

  return <GraphTitleAxis />;
};

export default ViewDashboard;
