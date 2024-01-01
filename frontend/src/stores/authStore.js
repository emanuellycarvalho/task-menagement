import axios, { getCSRFToken } from '../boot/axios';

const API_BASE_URL = '/auth'; 

export const loginUser = async ({ email, password }) => {
  try {
    const csrfToken = await getCSRFToken();
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    console.log('User logged in:', response.data.user);
    console.log('Access token:', response.data.access_token);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
