import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes'

const app = express()

app.use(compression())
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.listen(3000, () => {
  console.log('Application listening on port 3000')
})
