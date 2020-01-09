import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateGraph from '../graph/create/CreateGraph';
import GraphTitleAxis from '../../app/Brett/GraphTitleAxis';
import { getGraphs } from './dashboardSlice';

const ViewDashboard = () => {
  const dispatch = useDispatch();
  const { graphs } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getGraphs('4'));
  }, [dispatch]);

  if (graphs) {
    return <CreateGraph />;
  }
  return <GraphTitleAxis />;
};

export default ViewDashboard;
