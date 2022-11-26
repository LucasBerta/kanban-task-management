import { throwNewError } from '../../core/common';
import { errorNames } from '../../core/validators';
import TaskDB from './task.db';
import ITask from './task.interface';

export async function deleteTask(boardId: string, taskId: string) {
  const board = await TaskDB.deleteTask(boardId, taskId);
  if (!board) throwNewError(errorNames.DATA_NOT_FOUND, 'The board you are trying to modify does not exist.');

  return board;
}

export async function updateTask(boardId: string, taskId: string, payload: ITask) {
  const board = await TaskDB.updateTask(boardId, taskId, payload);
  if (!board) throwNewError(errorNames.INTERNAL_ERROR);

  return board;
}
