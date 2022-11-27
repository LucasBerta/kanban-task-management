import BoardDB from './board.db';
import IBoard from './board.interface';
import { isEmpty, getDuplicatedRecords, errorNames } from './../../core/validators';
import { throwNewError } from '../../core/common';

export async function getAllBoards() {
  return await BoardDB.getAllBoards();
}

export async function deleteBoard(id: String) {
  return await BoardDB.deleteBoard(id);
}

export async function createBoard(board: IBoard) {
  validateBoardForm(board);

  const boardFound = await getDuplicatedBoard(board);
  if (!!boardFound) {
    throwNewError(
      errorNames.VALIDATION,
      `There is already a board with the name "${boardFound.name}". Please choose a different one!`
    );
  }

  return await BoardDB.createBoard(board);
}

export async function updateBoard(id: String, board: IBoard) {
  validateBoardForm(board);
  const updatedBoard = await BoardDB.updateBoard(id, board);
  if (!updatedBoard) throwNewError(errorNames.VALIDATION, "The board you're trying to update couldn''t be found!");
  return updatedBoard;
}

// Local validators
function validateBoardForm(board: IBoard) {
  if (isEmpty(board.name)) {
    throwNewError(errorNames.VALIDATION, 'Board name is required!');
  }

  if (isThereAnyEmptyColumn(board)) {
    throwNewError(errorNames.VALIDATION, 'Column name is required!');
  }

  if (getDuplicatedColumns(board).length > 0) {
    const duplicatedColumns = getDuplicatedColumns(board);
    throwNewError(
      errorNames.VALIDATION,
      `The column${duplicatedColumns.length > 1 ? 's' : ''} "${duplicatedColumns.join(', ')}" ${
        duplicatedColumns.length > 1 ? 'are' : 'is'
      } duplicated!`
    );
  }
}

function isThereAnyEmptyColumn(board: IBoard) {
  return !!board.columns?.find(column => isEmpty(column.name));
}

function getDuplicatedColumns(board: IBoard) {
  return getDuplicatedRecords(board.columns?.map(column => column.name));
}

async function getDuplicatedBoard(board: IBoard): Promise<IBoard | null> {
  return await BoardDB.getBoard({
    name: { $regex: new RegExp(`${board.name}`, 'gi') },
  });
}
