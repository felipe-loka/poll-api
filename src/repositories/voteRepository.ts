import connection from '../config/database/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { type FieldPacket, type ResultSetHeader } from 'mysql2'

dayjs.extend(utc)

export const createVote = async (pollId: string, choices: number[]): Promise<void> => {
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
