import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createPoll, getPollQuestion } from '../repositories/pollRepository'
import { createChoices, getChoices } from '../repositories/choiceRepository'

export const create = async (req: Request, res: Response): Promise<void> => {
  const uuid = uuidv4()
  const body = req.body
  createPoll(uuid, body.question, body.multiChoice)
  createChoices(uuid, body.choice)
  res.send({
    message: 'Poll created successfully',
    status: 'success',
    data: {
      uuid
    }
  })
}

export const get = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid
  const question = await getPollQuestion(uuid)
  if (question === null) {
    res.status(404)
    res.send({
      message: 'Poll does not exist',
      status: 'failed',
      data: {}
    })
  }
  const choices = await getChoices(uuid)
  res.send({
    message: 'Poll retrieved successfully',
    status: 'success',
    data: {
      question,
      choice: choices
    }
  })
}
