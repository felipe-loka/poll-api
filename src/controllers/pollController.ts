import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createPoll, getPoll } from '../repositories/pollRepository'
import { createChoices, getChoices } from '../repositories/choiceRepository'
import { buildErrorResponse, buildSuccessResponse } from '../utils/response'
import { type INewPoll } from '../validators/pollValidators'
import { MAX_NUMBER_OF_CHOICES } from '../config/environments'

export const create = async (req: Request, res: Response): Promise<void> => {
  const uuid = uuidv4()
  const body: INewPoll = req.body
  if (body.choice.length > MAX_NUMBER_OF_CHOICES) {
    res.status(400).send(buildErrorResponse(
      `Max number of choices in a poll is ${MAX_NUMBER_OF_CHOICES}`
    ))
    return
  } else {
    console.log('xd')
  }
  console.log(body.choice.length)
  console.log(MAX_NUMBER_OF_CHOICES)

  await createPoll(uuid, body.question, body.multiChoice)
  await createChoices(uuid, body.choice)
  res.send(buildSuccessResponse(
    'Poll created successfully',
    { uuid }
  ))
}

export const get = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid
  const question = await getPoll(uuid)
  if (question === null) {
    res.status(404).send(buildErrorResponse(
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
