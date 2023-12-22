import axios from '../axios';

const API_BASE_URL = '/tasks';

export const fetchTasks = async (setTasks) => {
  try {
    const response = await axios.get(API_BASE_URL);
    let tasks = response.data.data;

    setTasks(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${taskId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error getting task with ID ${taskId}:`, error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_BASE_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskData.id}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
