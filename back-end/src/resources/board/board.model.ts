import { model, Schema } from 'mongoose';
import { Task, taskSchema } from '../task/task.model';
import IBoard from './board.interface';

export class Board implements IBoard {
  id?: Number | undefined;
  name: String;
  columns?:
    | {
        name: String;
        tasks?: Task[] | undefined;
      }[]
    | undefined;

  constructor(
    id: Number | undefined,
    name: String,
    columns: Array<{
      name: String;
      tasks?: Array<Task>;
    }>
  ) {
    this.id = id;
    this.name = name;
    this.columns = columns;
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
