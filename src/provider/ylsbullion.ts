import { parse } from 'node-html-parser'
import { CurrencyData, Icons } from '../model'

export default class YlgBullion {
  private YLGBULLION_URL = process.env.YLGBULLION_URL || false
  private GOLD_99_THRESHOLD = process.env.GOLD_99_THRESHOLD || 0

  fetchCurrentPrice = async () => {
    if (!this.YLGBULLION_URL) return false

    const url = this.YLGBULLION_URL as string
    const response = await fetch(url)
    if (response.status !== 200) return false
    const html = await response.text()
    const root = parse(html)
    const buying = root.querySelector(`[data-value="bar99_tin"]`)?.text
    const selling = root.querySelector(`[data-value="bar99_tout"]`)?.text
    const result: CurrencyData = {
      selling: 0,
      buying: 0,
      currency: 'gold-ylg',
      provider: 'Ylg Bullion',
      icon: Icons.gold,
      sellingThreshold: +this.GOLD_99_THRESHOLD
    }

    if (buying && selling) {
      result.selling = parseInt(selling.replace(',',''))
      result.buying = parseInt(buying.replace(',',''))
    }

    return result
  }
}
