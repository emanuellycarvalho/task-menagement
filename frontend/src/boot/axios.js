import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

instance.get('/sanctum/csrf-cookie', {baseURL: 'http://localhost:8000'})
  .then(async response => {
    instance.defaults.headers.common['X-CSRF-TOKEN'] = response.config.headers['X-XSRF-TOKEN'];
  }).catch(error => {
    console.error('Erro ao obter cookie CSRF:', error);
});

export const getCSRFToken = async () => {
  try {
    const response = await axios.get('/sanctum/csrf-cookie', {
      baseURL: 'http://localhost:8000',
    });

    return response.headers['set-cookie'];
  } catch (error) {
    console.error('Erro ao obter cookie CSRF:', error);
    throw error;
  }
};

export default instance;
