import { Router } from 'express'
import { create, get } from '../controllers/voteController'
import { NewVote } from '../validators/voteValidators'
import validate from '../middlewares/validate'

const router = Router()

router.post('/', validate(NewVote), create)
router.get('/:uuid', get)

export default router
