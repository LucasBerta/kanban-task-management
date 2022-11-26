import express, { Request, Response } from 'express';
import { sendErrorResponse } from '../../core/common';
import { createBoard, getAllBoards } from './board.controller';
import IBoard from './board.interface';

const board = express.Router();

board.get('/', async (req: Request, res: Response) => {
  res.send(await getAllBoards());
});

board.get('/:id', (req: Request, res: Response) => {
  res.send('Board id ' + req.params.id);
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
