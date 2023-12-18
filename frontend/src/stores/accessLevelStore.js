import axios from '../axios';

const API_BASE_URL = '/access_levels';

export const fetchAccessLevels = async (setAccessLevels) => {
  try {
    const response = await axios.get(API_BASE_URL);
    setAccessLevels(response.data.data);
  } catch (error) {
    console.error('Error getting access levels:', error);
  }
};

export const getAccessLevels = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error getting access levels:', error);
    throw error;
  }
};
