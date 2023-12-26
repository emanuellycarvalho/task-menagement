import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default instance;
