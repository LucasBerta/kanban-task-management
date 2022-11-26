import express, { Request, Response } from 'express';
import { sendErrorResponse } from '../../core/common';
import { createBoard, deleteBoard, getAllBoards } from './board.controller';
import IBoard from './board.interface';

const board = express.Router();

board.get('/', async (req: Request, res: Response) => {
  try {
    const boards = await getAllBoards();
    res.status(200).json(boards);
  } catch (e: any) {
    sendErrorResponse(res, e);
  }
});

board.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteBoard(req.params.id);
    res.status(204).send('Board deleted successfully!');
  } catch (e: any) {
    sendErrorResponse(res, e);
  }
});

board.post('/', async (req: Request, res: Response) => {
  try {
    delete req.body._id;
    const board: IBoard = req.body;
    const newBoard = await createBoard(board);
    res.status(201).json(newBoard);
  } catch (e: any) {
    sendErrorResponse(res, e);
  }
});

export default board;
