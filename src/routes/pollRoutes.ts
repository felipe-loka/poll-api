import { Router } from 'express'
import { create } from '../controllers/pollController'
import { NewPoll } from '../validators/pollValidators'
import validate from '../middlewares/validate'

const router = Router()

router.post('/', validate(NewPoll), create)

export default router
