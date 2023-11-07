import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createPoll, getPollQuestion } from '../repositories/pollRepository'
import { createChoices, getChoices } from '../repositories/choiceRepository'
import { buildErrorResponse, buildSuccessResponse } from '../utils/response'

export const create = async (req: Request, res: Response): Promise<void> => {
  const uuid = uuidv4()
  const body = req.body
  await createPoll(uuid, body.question, body.multiChoice)
  await createChoices(uuid, body.choice)
  res.send(buildSuccessResponse(
    'Poll created successfully',
    { uuid }
  ))
}

export const get = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid
  const question = await getPollQuestion(uuid)
  if (question === null) {
    res.status(404)
    res.send(buildErrorResponse(
      'Poll does not exist'
    ))
  } else {
    const choices = await getChoices(uuid)
    res.send(buildSuccessResponse(
      'Poll retrieved successfully',
      {
        question,
        choices
      }
    ))
  }
}
