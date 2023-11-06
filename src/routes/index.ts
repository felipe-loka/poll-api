import { Router } from 'express'
import pollRouter from './pollRoutes'
const router = Router()

router.use('/poll', pollRouter)

router.use('/healthy', (req, res) => {
  res.send('OK!')
})

export default router
