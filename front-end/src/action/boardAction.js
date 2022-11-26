export const ACTION_SET_SELECTED_BOARD = 'SET_SELECTED_BOARD';
export const ACTION_REFRESH_SELECTED_BOARD = 'REFRESH_SELECTED_BOARD';
export const ACTION_REFRESH_BOARD = 'REFRESH_BOARD';
export const ACTION_SET_BOARDS = 'SET_BOARDS';

export function setSelectedBoard(board) {
  return dispatch => {
    return dispatch({ type: ACTION_SET_SELECTED_BOARD, board });
  };
}

export function refreshSelectedBoard() {
  return dispatch => {
    return dispatch({ type: ACTION_REFRESH_SELECTED_BOARD });
  };
}

export function refreshBoard(board) {
  return dispatch => {
    return dispatch({ type: ACTION_REFRESH_BOARD, board });
  };
}

export function setBoards(boards) {
  return dispatch => {
    return dispatch({ type: ACTION_SET_BOARDS, boards });
  };
}
