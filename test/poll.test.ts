import { MAX_NUMBER_OF_CHOICES } from '../src/config/environments'
import app from './common'

describe('GET /poll', () => {
  test('Get valid poll', async () => {
    const response = await app.get('/poll/3cf01771-98e6-4ee9-ab27-8d431ce2f6ec')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Poll retrieved successfully',
      status: 'success',
      data: {
        question: {
          question: 'What is the best holiday of the year?',
          multiChoice: false
        },
        choices: {
          1: 'Easter',
          2: 'Christmas',
          3: 'Thanksgiving',
          4: 'Halloween'
        }
      }
    })
  })

  test('Get a poll that does not exist', async () => {
    const response = await app.get('/poll/does-not-exist')

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'Poll does not exist',
      status: 'failed'
    })
  })
})

describe('POST /poll', () => {
  test('Create a valid poll', async () => {
    const response = await app.post('/poll').send({
      question: 'What do you think about our test coverage?',
      multiChoice: false,
      choice: [
        'good',
        'bad'
      ]
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Poll created successfully')
    expect(response.body.status).toBe('success')
  })

  test('Create a valid poll and verify it was created', async () => {
    const createPollResponse = await app.post('/poll').send({
      question: 'Will this poll be created?',
      multiChoice: false,
      choice: [
        'yes',
        'no'
      ]
    })
    expect(createPollResponse.statusCode).toBe(200)
    expect(createPollResponse.body.message).toBe('Poll created successfully')
    expect(createPollResponse.body.status).toBe('success')

    const uuid = createPollResponse.body.data.uuid
    const getPollResponse = await app.get(`/poll/${uuid}`)
    expect(getPollResponse.statusCode).toBe(200)
  })

  test('Create an invalid poll - with a single choice', async () => {
    const response = await app.post('/poll').send({
      question: 'Will this work?',
      multiChoice: false,
      choice: [
        'yes'
      ]
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'Input validation failed',
      status: 'failed',
      error: [
        {
          path: 'choice',
          message: 'There must be at least two choices in the poll!'
        }
      ]
    })
  })

  test('Create an invalid poll - too many choices', async () => {
    const response = await app.post('/poll').send({
      question: 'How many choices are allowed to be created?',
      multiChoice: false,
      choice: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: `Max number of choices in a poll is ${MAX_NUMBER_OF_CHOICES}`,
      status: 'failed'
    })
  })

  test('Create an invalid poll - missing multiChoice', async () => {
    const response = await app.post('/poll').send({
      question: 'Did you forget to add the multiChoice key?',
      choice: [
        'yes',
        'yes but in another option'
      ]
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'Input validation failed',
      status: 'failed',
      error: [
        {
          path: 'multiChoice',
          message: "The field 'multiChoice' is required and represents if the poll should accept more than one option in the same vote."
        }
      ]
    })
  })

  test('Create an invalid poll - missing question', async () => {
    const response = await app.post('/poll').send({
      multiChoice: false,
      choice: [
        'Hey, you forgot the question!',
        'Go back and fix it!'
      ]
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'Input validation failed',
      status: 'failed',
      error: [
        {
          path: 'question',
          message: "The field 'question' is required and represents the question of the poll to be created."
        }
      ]
    })
  })
})
