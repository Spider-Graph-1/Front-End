import axios from 'axios';
import axiosWithAuth from './utils/axiosWithAuth';

export const requestRegistration = (user) =>
  axios.post('https://spidergraph-backend.herokuapp.com/api/auth/register', {
    user,
  });

export const requestAuthentication = (username, password) =>
  axiosWithAuth().post('/auth/login', {
    username,
    password,
  });
