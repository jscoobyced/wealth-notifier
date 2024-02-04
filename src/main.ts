import CurrencyService from './service/currencyservice'
import NotificationService from './service/notificationservice'

export const run = async () => {
  const currencyService = new CurrencyService()
  const currencyData = await currencyService.run()

  if (currencyData) {
    const notificationService = new NotificationService()
    await notificationService.run(currencyData)
  }
}
