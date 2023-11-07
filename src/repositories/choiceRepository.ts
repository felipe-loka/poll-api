import connection from '../config/database/database'

interface Choice {
  choiceId: string
  choice: string
}

export const createChoices = async (uuid: string, choices: string[]): Promise<void> => {
  const valuesToInsert = choices.map((choice: string) => [uuid, choice])
  const conn = await connection
  conn.query(
    'INSERT INTO `choice` (poll_id, choice) VALUES ?',
    [valuesToInsert]
  )
}

export const getChoices = async (uuid: string): Promise<Choice | null> => {
  const conn = await connection
  const [rows] = await conn.query(
    'SELECT choice_id, choice FROM `choice` WHERE poll_id = ?',
    [uuid]
  )
  const result: Choice[] = JSON.parse(JSON.stringify(rows))
  if (result.length === 0) {
    return null
  }
  const choices: any = {}
  result.forEach((item: any) => {
    choices[item.choice_id] = item.choice
  })
  return choices
}
