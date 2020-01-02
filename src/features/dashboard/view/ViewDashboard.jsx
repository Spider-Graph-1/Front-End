import React, { useState, useEffect } from 'react';
import CreateGraph from '../../graph/create/CreateGraph';
import axiosWithAuth from '../../../api/utils/axiosWithAuth';
import GraphTitleAxis from '../../../app/Brett/GraphTitleAxis';

const ViewDashboard = () => {
  const [formData, setFormData] = useState({ title: '', axe: '' });

  const [graphs, setGraphs] = useState(null);

  useEffect(() => {
    axiosWithAuth()
      .get('/graphs')
      .then((response) => setGraphs(response.body))
      .catch((error) => console.log(error));
  }, []);

  if (graphs) {
    return <CreateGraph />;
  }
  return <GraphTitleAxis setFormData={setFormData} formData={formData} />;
};

export default ViewDashboard;
