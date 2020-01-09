import axios from 'axios';

const tempAxiosBrett = () =>
  axios.create({
    baseURL: 'https://spridergraph-testing.herokuapp.com/api',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

export default tempAxiosBrett;
