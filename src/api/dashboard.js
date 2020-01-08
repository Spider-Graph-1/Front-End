import axiosWithAuth from './utils/axiosWithAuth';

const requestGraphs = async (user) => {
  const { data, ...rest } = await axiosWithAuth().get(`/graphs/${user}`);

  return { data, rest };
};

export default requestGraphs;
