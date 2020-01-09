import axiosWithAuth from './utils/axiosWithAuth';

const requestGraphs = async () => {
  await console.log(axiosWithAuth().get('/graphs'));
  const { data, ...rest } = await axiosWithAuth().get('/graphs');

  return { data, rest };
};

export default requestGraphs;
