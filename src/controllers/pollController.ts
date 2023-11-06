import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createPoll } from '../repositories/pollRepository'
import { createChoices } from '../repositories/choiceRepository'

export const create = async (req: Request, res: Response): Promise<void> => {
  const uuid = uuidv4()
  const body = req.body
  createPoll(uuid, body.question, body.multiChoice)
  createChoices(uuid, body.choice)
  res.send({
    status: 'success',
    data: {
      uuid
    }
  })
}
