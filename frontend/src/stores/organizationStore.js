import axios from '../boot/axios';

const API_BASE_URL = '/organizations';

export const fetchOrganizations = async (setOrganizations) => {
  try {
    const response = await axios.get(API_BASE_URL);
    setOrganizations(response.data.data);
  } catch (error) {
    console.error('Error getting organizations:', error);
  }
};

export const getOrganizations = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error getting organizations:', error);
    throw error;
  }
};

export const createOrganization = async (organizationData) => {
  try {
    const response = await axios.post(API_BASE_URL, organizationData);
    return response.data;
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
};

export const updateOrganization = async (organizationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${organizationData.id}`, organizationData);
    return response.data;
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
};

export const deleteOrganization = async (organizationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${organizationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error;
  }
};
