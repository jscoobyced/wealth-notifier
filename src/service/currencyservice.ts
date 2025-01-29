import { CurrencyData } from '../model'
import YlgBullion from '../provider/ylsbullion'

export const checkGoldPrice = async () => {
  const messages: CurrencyData[] = []

  const ylgBullionMessage = await checkYlg()
  if (ylgBullionMessage) {
    messages.push(ylgBullionMessage)
  }

  return messages
}

const checkYlg = async () => {
  const ylgBullion = new YlgBullion()
  const ylgBullionMessage = await ylgBullion.fetchCurrentPrice()
  return ylgBullionMessage
}
