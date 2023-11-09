import app from './common'

describe('POST /vote', () => {
  test('Vote in a poll', async () => {
    const response = await app.post('/vote').send({
      pollId: '3cf01771-98e6-4ee9-ab27-8d431ce2f6ec',
      choiceId: [1]
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Vote was created!',
      status: 'success',
      data: {}
    })
  })

  test('Vote in a poll that does not exist', async () => {
    const response = await app.post('/vote').send({
      pollId: 'does-not-exist',
      choiceId: [1]
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'You can not vote in a poll that does not exist. Verify if the given pool id is correct.',
      status: 'failed'
    })
  })

  test('Vote in a singleChoice poll giving more than one choice', async () => {
    const uuid = '3cf01771-98e6-4ee9-ab27-8d431ce2f6ec'
    const getPollResponse = await app.get(`/poll/${uuid}`).send({
      pollId: uuid,
      choiceId: [1, 3, 2]
    })
    expect(getPollResponse.body.data.question.multiChoice).toBe(false)

    const voteResponse = await app.post('/vote').send({
      pollId: uuid,
      choiceId: [1, 3, 2]
    })
    expect(voteResponse.statusCode).toBe(404)
    expect(voteResponse.body).toStrictEqual({
      message: 'You can only vote in a single option per vote.',
      status: 'failed'
    })
  })

  test('Vote in a poll giving choices that are not present in the poll', async () => {
    const response = await app.post('/vote').send({
      pollId: '3cf01771-98e6-4ee9-ab27-8d431ce2f6ec',
      choiceId: [-1]
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'The choices IDs provided are not present in the poll.',
      status: 'failed'
    })
  })
})

describe('GET /vote', () => {
  test('Get vote of a poll', async () => {
    const response = await app.get('/vote/3cf01771-98e6-4ee9-ab27-8d431ce2f6ec')

    expect(response.body.message).toBe('Votes retrieved successfully')
    expect(response.body.status).toBe('success')
  })

  test('Create new poll, vote and check if vote was computed', async () => {
    const createPollResponse = await app.post('/poll').send({
      question: 'Is the voting system working?',
      multiChoice: false,
      choice: [
        'yes',
        'no'
      ]
    })
    expect(createPollResponse.statusCode).toBe(200)

    const uuid = createPollResponse.body.data.uuid
    const getPollResponse = await app.get(`/poll/${uuid}`)
    expect(getPollResponse.body.data).toHaveProperty('choices')

    const choices = getPollResponse.body.data.choices
    const yesChoiceId: string = Object.keys(choices).find(key => choices[key] === 'yes') ?? ''
    const voteResponse = await app.post('/vote').send({
      pollId: uuid,
      choiceId: [Number(yesChoiceId)]
    })
    expect(voteResponse.statusCode).toBe(200)

    const getVoteResponse = await app.get(`/vote/${uuid}`)
    expect(getVoteResponse.body.data[yesChoiceId]).toBe(1)
  })
})
