import console from 'console'
import connection from '../config/database/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { type FieldPacket, type ResultSetHeader } from 'mysql2'

dayjs.extend(utc)

export const createVote = async (choices: number[]): Promise<void> => {
  const conn = await connection
  const datetime = dayjs().utc().format('YYYY-MM-DD H:mm:ss')
  const [voteQuery]: [ResultSetHeader, FieldPacket[]] = await conn.execute(
    'INSERT INTO `vote` (vote_date) VALUES (?)',
    [datetime]
  )
  const voteChoice = choices.map((choice: number) => [choice, voteQuery.insertId])
  await conn.query(
    'INSERT INTO `choice_vote` (choice_id, vote_id) VALUES ?',
    [voteChoice]
  )
}

interface Votes {
  choiceId: string
  voteNumber: number
}

export const getVotes = async (pollId: string): Promise<Votes | null> => {
  const conn = await connection
  const [rows] = await conn.execute(
    `
    SELECT choice.choice_id, COUNT(choice_vote.vote_id) as votes
    FROM  choice
    LEFT JOIN choice_vote
    ON choice_vote.choice_id = choice.choice_id
    WHERE choice.poll_id = ?
    GROUP BY choice.choice_id
    `,
    [pollId]
  )
  const result = JSON.parse(JSON.stringify(rows))
  if (result.length === 0) {
    return null
  }
  const votes: any = {}
  result.forEach((item: any) => {
    votes[item.choice_id] = item.votes
  })
  return votes
}
