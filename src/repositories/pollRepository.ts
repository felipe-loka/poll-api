import connection from '../config/database/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const createPoll = async (uuid: string, question: string, multiChoice: boolean): Promise<void> => {
  const datetime = dayjs().utc().format('YYYY-MM-DD H:mm:ss')
  const conn = await connection
  conn.execute(
    'INSERT INTO `poll` (poll_id, question, multi_choice, creation_date) VALUES (?, ?, ?, ?)',
    [uuid, question, multiChoice, datetime]
  )
}

export const getPollQuestion = async (uuid: string): Promise<string | null> => {
  const conn = await connection
  const [rows] = await conn.execute(
    'SELECT question FROM `poll` WHERE poll_id = ?',
    [uuid]
  )
  const result = JSON.parse(JSON.stringify(rows))
  if (result.length === 0) {
    return null
  }
  const question = result[0].question
  return question
}
