import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
;(async () => {
  dotenv.config()
  const server: Express = express()
  const port = process.env.PORT || 3000

  server.get('/', (request: Request, response: Response) => {
    response.json({ result: request.statusCode })
  })
})().catch((e) => {
  console.error(e)
})
