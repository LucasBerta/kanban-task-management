import axios from 'axios';
import { showSnackbar } from '../../action/snackbarAction';
import { snackbarSeverities } from '../components/snackbar/Snackbar';
import appStore from '../store/appStore';

export const apiEndpoint = {
  BOARDS: '/boards',
  BOARDS_ID: '/boards/:id',
  TASKS: '/boards/:boardId/tasks',
  TASKS_ID: '/boards/:boardId/tasks/:id',
};

const api = axios.create({
  baseURL: 'https://kanban-task-management-back-end.onrender.com',
});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.put['Content-Type'] = 'application/json';

api.interceptors.response.use(
  response => response,
  err => {
    appStore.dispatch(showSnackbar(err.response?.data || err.message, snackbarSeverities.ERROR));
    return Promise.reject(err);
  }
);

export default api;
