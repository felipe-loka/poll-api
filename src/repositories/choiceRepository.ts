import connection from '../config/database/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const createChoices = async (uuid: string, choices: string[]): Promise<void> => {
  const valuesToInsert = choices.map((choice: string) => [uuid, choice])
  const conn = await connection
  try {
    conn.query(
      'INSERT INTO `choice` (poll_id, choice) VALUES ?',
      [valuesToInsert]
    )
  } catch {
    console.log('Error')
  }
}

export const getChoices = async (uuid: string): Promise<string[] | null> => {
  const conn = await connection
  const [rows] = await conn.query(
    'SELECT choice FROM `choice` WHERE poll_id = ?',
    [uuid]
  )
  const result = JSON.parse(JSON.stringify(rows))
  if (result.length === 0) {
    return null
  }
  const choices = result.map((item: any) => item.choice)
  return choices
}
