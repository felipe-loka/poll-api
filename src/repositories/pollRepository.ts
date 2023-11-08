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

interface Poll {
  question: string
  multiChoice: boolean
}

export const getPoll = async (uuid: string): Promise<Poll | null> => {
  const conn = await connection
  const [rows] = await conn.execute(
    'SELECT question, multi_choice FROM `poll` WHERE poll_id = ?',
    [uuid]
  )
  const result = JSON.parse(JSON.stringify(rows))
  if (result.length === 0) {
    return null
  }
  const poll = {
    question: result[0].question,
    multiChoice: Boolean(result[0].multi_choice)
  }
  return poll
}
