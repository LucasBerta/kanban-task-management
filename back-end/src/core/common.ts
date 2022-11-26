import { Response } from 'express';
import { errorNames } from './validators';

export function throwNewError(name: string, message?: string) {
  const newError = new Error(message);
  newError.name = name;
  throw newError;
}

export function sendErrorResponse(res: Response, error: Error) {
  if (error?.name === errorNames.VALIDATION) {
    res.status(400).send(error.message);
    return;
  }
  if (error?.name === errorNames.DATA_NOT_FOUND) {
    res.status(404).send(error.message);
    return;
  }
  if (error?.name === errorNames.INTERNAL_ERROR) {
    res.status(500).send(error.message || 'Internal server error');
    return;
  }
  res.status(500).send(error.message);
}
