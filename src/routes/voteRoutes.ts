import { Router } from 'express'
import { create } from '../controllers/voteController'
import { NewVote } from '../validators/voteValidators'
import validate from '../middlewares/validate'

const router = Router()

router.post('/', validate(NewVote), create)

export default router
