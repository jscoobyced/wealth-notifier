import CurrencyService from './service/currencyservice'
import NotificationService from './service/notificationservice'

export const run = async () => {
  console.log(
    new Date().toISOString().replace('T', ' ').substring(0, 19),
    'Checking gold price.'
  )
  const currencyService = new CurrencyService()
  const currencyData = await currencyService.run()

  if (currencyData) {
    const notificationService = new NotificationService()
    await notificationService.run(currencyData)
  }
}
