import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes'
import { PORT, NODE_ENV } from './config/environments'
import logger from './config/logger'

const app = express()

app.use(compression())
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(router)

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info('Application listening on port 3000')
  })
} else {
  app.listen(0, () => {
    logger.info('Starting application to run tests...')
  })
}

export default app
