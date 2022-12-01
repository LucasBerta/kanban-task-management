import {
  ACTION_REFRESH_BOARD,
  ACTION_REFRESH_SELECTED_BOARD,
  ACTION_REFRESH_TASK,
  ACTION_SET_BOARDS,
  ACTION_SET_SELECTED_BOARD,
} from '../action/boardAction';

export default function boardReducer(state, action) {
  switch (action.type) {
    case ACTION_SET_SELECTED_BOARD:
      return { ...state, selectedBoard: action.board };
    case ACTION_REFRESH_SELECTED_BOARD:
      return { ...state, selectedBoard: state.boards?.find(board => board._id === state.selectedBoard?._id) };
    case ACTION_REFRESH_BOARD:
      const newBoard = { ...action.board };
      const boards = state.boards.map(board => (board._id === newBoard._id ? newBoard : board));
      return { ...state, boards, selectedBoard: newBoard };
    case ACTION_REFRESH_TASK:
      const _boards = state.boards.map(board =>
        board._id === action.board._id
          ? {
              ...action.board,
              tasks: action.board.tasks?.map(task => (task._id === action.task._id ? action.task : task)),
            }
          : board
      );
      const _selectedBoard = state.boards.map(board => (board._id === action.board._id ? action.board : board));
      return { ...state, boards: _boards, selectedBoard: _selectedBoard };
    case ACTION_SET_BOARDS:
      return { ...state, boards: action.boards };
    default:
      return state || { boards: [] };
  }
}
