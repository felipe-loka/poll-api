import { z } from 'zod'

export const NewPoll = z.object({
  question: z.string({
    required_error: "The field 'question' is required and represents the question of the poll to be created."
  })
    .trim(),

  multiChoice: z.boolean({
    required_error: "The field 'multiChoice' is required and represents if the poll should accept more than one option in the same vote."
  }),

  choice: z.array(z.string({
    required_error: "The field 'choice' is required and represents the list of choices that the user can vote."
  })).min(2, 'There must be at least two choices in the poll!')
})
