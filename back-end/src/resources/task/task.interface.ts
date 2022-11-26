import { ObjectId } from 'mongoose';

export default interface ITask {
  _id: ObjectId;
  title: String;
  description: String;
  status: String;
  subtasks?: Array<{
    title: String;
    isCompleted: Boolean;
  }>;
}
