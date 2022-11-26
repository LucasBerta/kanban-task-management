import api, { apiEndpoint } from './api';

export default class TaskApi {
  static async deleteTask(board, task) {
    return api.delete(apiEndpoint.TASKS_ID.replace(':boardId', board._id).replace(':id', task._id));
  }

  static async updateTask(board, task) {
    return api.put(apiEndpoint.TASKS_ID.replace(':boardId', board._id).replace(':id', task._id), task);
  }
}
