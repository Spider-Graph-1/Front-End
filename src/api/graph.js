import axiosWithAuth from './utils/axiosWithAuth';

export const saveGraph = async (graph) => {
  const result = await axiosWithAuth().post('/graphs', graph);
  console.log(graph);

  return result;
};
