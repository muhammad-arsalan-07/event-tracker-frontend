import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://event-tracker.zeabur.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;