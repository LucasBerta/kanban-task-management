import IBoard from './board.interface';
import BoardModel from './board.model';

export default class BoardDB {
  public static async getAllBoards() {
    const boards = await BoardModel.find();
    return boards;
  }

  public static async getBoard(filter: Object) {
    return await BoardModel.findOne(filter);
  }

  public static async deleteBoard(id: String) {
    return await BoardModel.findOneAndDelete({ _id: id });
  }

  public static async createBoard(_board: IBoard) {
    const board = new BoardModel(_board);
    return await board.save();
  }
}
