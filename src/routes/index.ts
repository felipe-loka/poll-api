import { Router } from 'express'
import pollRouter from './pollRoutes'
import voteRouter from './voteRoutes'
const router = Router()

router.use('/poll', pollRouter)
router.use('/vote', voteRouter)

router.use('/healthy', (req, res) => {
  res.send('OK!')
})

export default router
