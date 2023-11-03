import { Router } from 'express'
import poolRouter from './poolRoutes'

const router = Router()

router.use('/pool', poolRouter)

router.use('/healthy', (req, res) => {
  res.send('OK!')
})

export default router
