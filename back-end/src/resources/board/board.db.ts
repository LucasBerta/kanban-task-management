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

  public static async createBoard(board: IBoard) {
    const _board = new BoardModel(board);
    return await _board.save();
  }

  public static async updateBoard(id: String, board: IBoard) {
    const savedBoard = await BoardModel.findOne({ _id: `${id}` });
    if (areEqual(savedBoard?.columns, board.columns)) {
      return await BoardModel?.findByIdAndUpdate(id, board, { new: true });
    }
    const newBoard = { ...board };
    newBoard.tasks = newBoard.tasks?.map(task => ({
      ...task,
      status: getNewStatus(savedBoard?.columns, board.columns, task) || '',
    }));
    newBoard.tasks = newBoard.tasks?.filter(task => task.status !== '');
    return await BoardModel?.findByIdAndUpdate(id, newBoard, { new: true });
  }
}

//Validators and Hanlders
function getNewStatus(
  savedBoardColumns: Array<{ name: String }> | undefined,
  newBoardColumns: Array<{ name: String }> | undefined,
  task: { status: String }
) {
  const statusIndex = savedBoardColumns?.findIndex(column => column.name === task.status);
  return newBoardColumns?.find((column, index) => index === statusIndex)?.name;
}

function areEqual(oldArr: Array<{ name: String }> | undefined, newArr: Array<{ name: String }> | undefined) {
  if (oldArr?.length !== newArr?.length) return false;
  return oldArr?.every(item => newArr?.includes(item));
}
