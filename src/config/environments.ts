import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ?? '3000'
export const NODE_ENV = process.env.NODE_ENV

// DATABASE CONNECTION
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = process.env.DB_PORT ?? '3306'

// BUSINESS RULES
export const MAX_NUMBER_OF_CHOICES = process.env.MAX_NUMBER_OF_CHOICES === undefined ? 5 : Number(process.env.MAX_NUMBER_OF_CHOICES)
