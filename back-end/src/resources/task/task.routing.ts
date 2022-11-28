import express, { Request, Response } from 'express';
import { sendErrorResponse } from '../../core/common';
import { createTask, deleteTask, updateTask } from './task.controller';

const task = express.Router();
const baseUrl = '/boards/:boardId/tasks';

task.delete(baseUrl + '/:id', async (req: Request, res: Response) => {
  try {
    const board = await deleteTask(req.params.boardId, req.params.id);
    res.send(board);
  } catch (e: any) {
    sendErrorResponse(res, e);
  }
});

task.post(baseUrl, async (req: Request, res: Response) => {
  try {
    const board = await createTask(req.params.boardId, req.body);
    res.send(board);
  } catch (e: any) {
    sendErrorResponse(res, e);
  }
});

task.put(baseUrl + '/:id', async (req: Request, res: Response) => {
  try {
    const board = await updateTask(req.params.boardId, req.params.id, req.body);
    res.send(board);
  } catch (e: any) {
    sendErrorResponse(res, e);
  }
});

export default task;
