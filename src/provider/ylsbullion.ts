import { CurrencyData, YlgGoldData } from '../model'

export default class YlgBullion {
  private YLGBULLION_URL = process.env.YLGBULLION_URL ?? false

  fetchCurrentPrice = async () => {
    if (!this.YLGBULLION_URL) return false

    const url = this.YLGBULLION_URL as string
    const response = await fetch(url)
    if (response.status !== 200) return false
    const result: CurrencyData = {
      selling: 0,
      buying: 0,
      currency: 'gold-ylg',
      provider: 'Ylg Bullion',
    }
    try {
      const prices = (await response.json()) as YlgGoldData
      const buying = prices.bar99.tin
      const selling = prices.bar99.tout

      if (buying && selling) {
        result.selling = selling
        result.buying = buying
      }
    } catch (error: unknown) {
      void error
      return false
    }
    return result
  }
}
