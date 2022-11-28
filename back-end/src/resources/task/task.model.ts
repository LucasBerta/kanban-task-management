import mongoose, { model, ObjectId, Schema } from 'mongoose';
import ITask from './task.interface';

export class Task implements ITask {
  _id: ObjectId;
  title: String;
  description: String;
  status: String;
  subtasks?: { title: String; isCompleted: Boolean }[] | undefined;

  constructor(
    _id: any,
    title: String,
    description: String,
    status: String,
    subtasks?: Array<{
      title: String;
      isCompleted: Boolean;
    }>
  ) {
    this._id = _id || new mongoose.mongo.ObjectId();
    this.title = title;
    this.description = description;
    this.status = status;
    this.subtasks = subtasks;
  }
}

export const taskSchema = new Schema<ITask>({
  title: String,
  description: String,
  status: String,
  subtasks: Array<{
    title: String;
    isCompleted: Boolean;
  }>,
});
