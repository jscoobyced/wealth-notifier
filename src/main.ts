import { checkGoldPrice } from './service/currencyservice'
import { notifyCurrencyChange } from './service/notificationservice'

export const run = async () => {
  console.log(
    new Date().toISOString().replace('T', ' ').substring(0, 19),
    'Checking gold price.',
  )
  const currencyData = await checkGoldPrice()

  await notifyCurrencyChange(currencyData)
}
