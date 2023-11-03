import { type Request, type Response } from 'express'

export const create = async (req: Request, res: Response): Promise<void> => {
  res.send('Created!')
}
