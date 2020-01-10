import axiosWithAuth from './utils/axiosWithAuth';

export const saveGraph = (graph) => axiosWithAuth().post('/graphs', graph);

export const editGraph = (id, graph) =>
  axiosWithAuth().put(`/graphs/${id}`, graph);
