import mysql from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } from '../environments'
import iconvLite from 'iconv-lite'

iconvLite.encodingExists('foo')

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT)
})

export default conn
