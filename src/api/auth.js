import axios from 'axios';

export const requestRegistration = (user) =>
  axios.post(
    'https://spidergraph-backend.herokuapp.com/api/auth/register',
    user
  );

export const requestLogin = (user) =>
  axios.post('https://spidergraph-backend.herokuapp.com/api/auth/login', user);
