import axios from '../axios';

const API_BASE_URL = '/users';

export const fetchUsers = async (setUsers) => {
  try {
    const response = await axios.get(API_BASE_URL);
    let users = response.data.data;
    users = users.map((item) => {
      item.name = item.first_name + ' ' + item.last_name;
      return item;
    });

    setUsers(users);
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    let users = response.data.data;
    users = users.map((item) => {
      item.name = item.first_name + ' ' + item.last_name;
      return item;
    });

    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    const user = response.data.data;
    user.name = user.first_name + ' ' + user.last_name;
    return user;
  } catch (error) {
    console.error(`Error getting user with ID ${userId}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const updateUsersPassword = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userData.id}/update-password`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user's password: ", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
