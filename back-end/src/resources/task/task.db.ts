import BoardModel from '../board/board.model';
import ITask from './task.interface';
import { Task } from './task.model';

export default class TaskDB {
  public static async deleteTask(boardId: string, taskId: string) {
    const board = await BoardModel.findOneAndUpdate({ _id: `${boardId}` }, { $pull: { tasks: { _id: taskId } } });
    return board;
  }

  public static async createTask(boardId: string, newTask: ITask) {
    const _newTask = new Task(newTask._id, newTask.title, newTask.description, newTask.status, newTask.subtasks);

    const board = await BoardModel.findOneAndUpdate({ _id: `${boardId}` }, { $push: { tasks: _newTask } }, { new: true });
    return board?.tasks;
  }

  public static async updateTask(boardId: string, taskId: string, newTask: ITask) {
    const _newTask = new Task(newTask._id, newTask.title, newTask.description, newTask.status, newTask.subtasks);

    const board = await BoardModel.findOneAndUpdate(
      { _id: `${boardId}`, 'tasks._id': `${taskId}` },
      { $set: { 'tasks.$': _newTask } },
      { new: true }
    );
    return board?.tasks?.find(task => `${task._id}` === taskId);
  }
}
