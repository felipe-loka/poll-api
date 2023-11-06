import connection from '../config/database/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const createPoll = (uuid: string, question: string, multiChoice: boolean): void => {
  const datetime = dayjs().utc().format('YYYY-MM-DD H:mm:ss')
  connection.execute(
    'INSERT INTO `poll` (poll_id, question, multi_choice, creation_date) VALUES (?, ?, ?, ?)',
    [uuid, question, multiChoice, datetime]
  )
}
