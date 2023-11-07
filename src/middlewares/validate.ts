import { type Request, type Response, type NextFunction } from 'express'
import { z } from 'zod'
import { buildErrorResponse } from '../utils/response'

const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync(req.body)
        next()
      } catch (error) {
        let err = error
        if (err instanceof z.ZodError) {
          err = err.issues.map((e) => ({ path: e.path[0], message: e.message }))
        }
        return res.status(400).json({
          message: 'Input validation failed',
          status: 'failed',
          error: err
        })
      }
    }

export default validate
