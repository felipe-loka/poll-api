import { Router } from 'express'
import { create } from '../controllers/poolController'

const router = Router()

router.post('/', create)

export default router
