import supertest from 'supertest'
import app from '../src'

const myApp = supertest(app)

export default myApp
