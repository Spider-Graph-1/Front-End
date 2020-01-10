import axiosWithAuth from './utils/axiosWithAuth';

const requestGraphs = async () => {
  const { data, ...rest } = await axiosWithAuth().get('/graphs');

  return { data, rest };
};

export default requestGraphs;
