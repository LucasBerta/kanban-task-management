import { throwNewError } from '../../core/common';
import { errorNames, getDuplicatedRecords, isEmpty } from '../../core/validators';
import TaskDB from './task.db';
import ITask from './task.interface';
import IBoard from './../board/board.interface';
import BoardDB from './../board/board.db';

export async function deleteTask(boardId: string, taskId: string) {
  const board = await TaskDB.deleteTask(boardId, taskId);
  if (!board) throwNewError(errorNames.DATA_NOT_FOUND, 'The board you are trying to modify does not exist.');

  return board;
}

export async function createTask(boardId: string, task: ITask) {
  validateTaskForm(boardId, task);

  const board = await TaskDB.createTask(boardId, task);
  if (!board) throwNewError(errorNames.INTERNAL_ERROR);

  return board;
}

export async function updateTask(boardId: string, taskId: string, task: ITask) {
  const board = await TaskDB.updateTask(boardId, taskId, task);
  if (!board) throwNewError(errorNames.INTERNAL_ERROR);

  return board;
}

// Local validators
function validateTaskForm(boardId: string, task: ITask) {
  if (isEmpty(task.title)) {
    throwNewError(errorNames.VALIDATION, 'Task title is required!');
  }

  if (isThereAnyEmptySubtask(task)) {
    throwNewError(errorNames.VALIDATION, 'Subtask title is required!');
  }

  if (getDuplicatedSubtasks(task).length > 0) {
    const duplicatedSubtasks = getDuplicatedSubtasks(task);
    throwNewError(
      errorNames.VALIDATION,
      `The subtask${duplicatedSubtasks.length > 1 ? 's' : ''} "${duplicatedSubtasks.join(', ')}" ${
        duplicatedSubtasks.length > 1 ? 'are' : 'is'
      } duplicated!`
    );
  }
}

function isThereAnyEmptySubtask(task: ITask) {
  return !!task.subtasks?.find(subtask => isEmpty(subtask.title));
}

function getDuplicatedSubtasks(task: ITask) {
  return getDuplicatedRecords(task.subtasks?.map(subtask => subtask.title));
}
