import dotenv from 'dotenv'
import * as Main from './main'

(async () => {
  dotenv.config()
  await Main.run()
})().catch(e => {
  console.error(e)
})
