import * as dotenv from 'dotenv'
import * as main from './main'
;(async () => {
  dotenv.config()
  await main.run()
})().catch((e: unknown) => {
  console.error(e)
})
