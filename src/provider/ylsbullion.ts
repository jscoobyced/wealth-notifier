import { CurrencyData, Icons, YlgGoldData } from '../model'

export default class YlgBullion {
  private YLGBULLION_URL = process.env.YLGBULLION_URL || false
  private GOLD_99_THRESHOLD = process.env.GOLD_99_THRESHOLD || 0

  fetchCurrentPrice = async () => {
    if (!this.YLGBULLION_URL) return false

    const url = this.YLGBULLION_URL as string
    const response = await fetch(url)
    if (response.status !== 200) return false
    const prices = (await response.json()) as YlgGoldData
    const buying = prices.bar99.tin
    const selling = prices.bar99.tout
    const result: CurrencyData = {
      selling: 0,
      buying: 0,
      currency: 'gold-ylg',
      provider: 'Ylg Bullion',
      icon: Icons.gold,
      sellingThreshold: +this.GOLD_99_THRESHOLD,
    }

    if (buying && selling) {
      result.selling = selling
      result.buying = buying
    }

    return result
  }
}

// curl -s 'https://www.ylgbullion.co.th/api/th/price/gold' -H 'accept: application/json' -H 'referer: https://www.ylgbullion.co.th/th/gold-price' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
