import { type Request, type Response } from 'express'
import { getChoices } from '../repositories/choiceRepository'
import { buildErrorResponse, buildSuccessResponse } from '../utils/response'
import { type INewVote } from '../validators/voteValidators'
import { getPoll } from '../repositories/pollRepository'
import { createVote, getVotes } from '../repositories/voteRepository'
import logger from '../config/logger'

function areAllChoicesPresent(choicesInPoll: string[], choicesInput: number[]): boolean {
  const choicesInPollAsNumber = choicesInPoll.map((choice: string) => Number(choice))
  return choicesInput.every((element) => choicesInPollAsNumber.includes(element))
}

export const create = async (req: Request, res: Response): Promise<void> => {
  logger.info('Creating a new vote')

  const body: INewVote = req.body

  const poll = await getPoll(body.pollId)
  if (poll === null) {
    res.status(404).send(buildErrorResponse(
      'You can not vote in a poll that does not exist. Verify if the given pool id is correct.'
    ))
    return
  } else {
    if (!poll.multiChoice && body.choiceId.length > 1) {
      res.status(404).send(buildErrorResponse(
        'You can only vote in a single option per vote.'
      ))
      return
    }
  }

  const availableChoices = await getChoices(body.pollId)
  if (availableChoices !== null) {
    const choiceIds = Object.keys(availableChoices)
    const allElementsPresent = areAllChoicesPresent(choiceIds, body.choiceId)
    if (!allElementsPresent) {
      res.status(404).send(buildErrorResponse(
        'The choices IDs provided are not present in the poll.'
      ))
      return
    }
  }

  await createVote(body.choiceId)
  res.send(buildSuccessResponse(
    'Vote was created!',
    {}
  ))
}

export const get = async (req: Request, res: Response): Promise<void> => {
  logger.info('Getting a votes')

  const uuid = req.params.uuid
  const poll = await getPoll(uuid)
  if (poll === null) {
    res.status(404).send(buildErrorResponse(
      'The given poll id does not exist.'
    ))
    return
  }
  const votes = await getVotes(uuid)
  if (votes !== null) {
    res.send(buildSuccessResponse(
      'Votes retrieved successfully',
      votes
    ))
  } else {
    res.send(buildErrorResponse(
      'Votes were not able to be retrieved. Try again.'
    ))
  }
}
