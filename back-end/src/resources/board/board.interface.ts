import { Task } from '../task/task.model';

export default interface IBoard {
  name: String;
  columns?: Array<{
    name: String;
  }>;
  tasks?: Array<Task>;
}
