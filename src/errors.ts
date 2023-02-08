import { Request, Response } from 'express'

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: Function,
) => {
  if (error instanceof NotFoundError) res.status(404)
  else res.status(500)

  if (process.env.NODE_ENV === 'production') {
    res.json({ error: error.message })
  }
  res.json({ error: error.message, stack: error.stack })
}
