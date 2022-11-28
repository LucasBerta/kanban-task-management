import { model, Schema } from 'mongoose';
import { Task, taskSchema } from '../task/task.model';
import IBoard from './board.interface';

export class Board implements IBoard {
  id?: Number | undefined;
  name: String;
  columns?:
    | {
        name: String;
      }[]
    | undefined;
  tasks?: Task[] | undefined;

  constructor(
    id: Number | undefined,
    name: String,
    columns: Array<{
      name: String;
    }>,
    tasks?: Array<Task>
  ) {
    this.id = id;
    this.name = name;
    this.columns = columns;
    this.tasks = tasks;
  }
}

const boardSchema = new Schema<IBoard>({
  name: String,
  columns: Array<{
    name: String;
  }>,
  tasks: [taskSchema],
});

const BoardModel = model('boards', boardSchema);

export default BoardModel;
