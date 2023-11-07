import { z } from 'zod'

export const NewVote = z.object({
  pollId: z.string({
    required_error: 'The uuid that represents the poll to be voted.'
  })
    .trim(),

  choiceId: z.array(z.number({
    required_error: 'The choiceId is required and represents the option that will be votedpoll should accept more than one option in the same vote.'
  })).min(1)
})

export type INewVote = z.infer<typeof NewVote>
