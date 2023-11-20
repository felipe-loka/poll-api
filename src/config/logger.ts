import winston, { format } from 'winston'
import { LOGGER_LEVEL } from './environments'

const consoleLoggerFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  format.printf((info) => {
    return JSON.stringify({
      timestamp: info.timestamp,
      level: info.level,
      message: info.message
    })
  }))

const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        consoleLoggerFormat
      )
    })
  ]
})

export default logger
