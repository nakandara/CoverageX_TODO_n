import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const getTasks = () => axios.get(`${API_BASE}/tasks`).then(res => res.data);
export const addTask = (title, description) =>
  axios.post(`${API_BASE}/tasks`, { title, description }).then(res => res.data);
export const completeTask = (id) =>
  axios.patch(`${API_BASE}/tasks/${id}/complete`).then(res => res.data); 