import { Router } from 'express'
import { create, get } from '../controllers/pollController'
import { NewPoll } from '../validators/pollValidators'
import validate from '../middlewares/validate'

const router = Router()

router.post('/', validate(NewPoll), create)
router.get('/:uuid', get)

export default router
