import axios from '../boot/axios';

const API_BASE_URL = '/tasklists';

export const fetchTaskLists = async (setTaskLists) => {
  try {
    const response = await axios.get(API_BASE_URL);
    let taskLists = response.data.data;

    setTaskLists(taskLists);
  } catch (error) {
    console.error('Error getting task lists:', error);
  }
};

export const getTaskLists = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error getting task lists:', error);
    throw error;
  }
};

export const getTaskListById = async (taskListId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${taskListId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error getting task list with ID ${taskListId}:`, error);
    throw error;
  }
};

export const createTaskList = async (taskListData) => {
  try {
    const response = await axios.post(API_BASE_URL, taskListData);
    return response.data;
  } catch (error) {
    console.error('Error creating task list:', error);
    throw error;
  }
};

export const updateTaskList = async (taskListData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskListData.id}`, taskListData);
    return response.data;
  } catch (error) {
    console.error('Error updating task list:', error);
    throw error;
  }
};

export const deleteTaskList = async (taskListId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${taskListId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task list:', error);
    throw error;
  }
};
