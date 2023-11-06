import connection from '../config/database/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const createChoices = (uuid: string, choices: string[]): void => {
  const valuesToInsert = choices.map((choice: string) => [uuid, choice])
  try {
    connection.query(
      'INSERT INTO `choice` (poll_id, choice) VALUES ?',
      [valuesToInsert]
    )
  } catch {
    console.log('Error')
  }
}
