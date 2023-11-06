import mysql from 'mysql2'
import { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } from '../environments'

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT)
})

export default conn
