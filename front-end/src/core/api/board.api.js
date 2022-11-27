import { setBoards } from '../../action/boardAction';
import store from '../store/appStore';
import api, { apiEndpoint } from './api';

export default class BoardApi {
  static async fetchAll() {
    return await api.get(apiEndpoint.BOARDS);
  }

  static async fetchAllAndUpdateState() {
    const { data } = await api.get(apiEndpoint.BOARDS);
    store.dispatch(setBoards(data));
    return data;
  }

  static async updateBoard(board) {
    return api.put(apiEndpoint.BOARDS_ID.replace(':id', board._id), board);
  }

  static async createBoard(board) {
    return api.post(apiEndpoint.BOARDS, board);
  }

  static async deleteBoard(id) {
    return api.delete(apiEndpoint.BOARDS_ID.replace(':id', id));
  }
}
