import axiosWithAuth from './utils/axiosWithAuth';

export const saveGraph = (graph) => axiosWithAuth().post('/graphs', graph);

export const editGraph = (id, graph) =>
  axiosWithAuth().put(`/graphs/${id}`, graph);

export const remove = (id) => axiosWithAuth().delete(`/graphs/${id}`);
