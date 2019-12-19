import axios from 'axios';

const axiosWithAuth = () =>
  axios.create({
    // TODO: point to real backend
    baseURL: 'http://localhost:5000/api/',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

export default axiosWithAuth;
