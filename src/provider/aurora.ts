import { parse } from 'node-html-parser'
import { CurrencyData, Icons } from '../model'

export default class Aurora {
  private AURORA_URL = process.env.AURORA_URL || false

  fetchCurrentPrice = async () => {
    if (!this.AURORA_URL) return false

    const url = this.AURORA_URL as string
    const response = await fetch(url)
    if (response.status !== 200) return false
    const html = await response.text()
    const root = parse(html)
    const values = root.querySelectorAll('h3.g-price')
    const result: CurrencyData = {
      selling: 0,
      buying: 0,
      currency: 'gold',
      provider: 'Aurora',
      icon: Icons.gold
    }
    if (values && values.length === 2) {
      result.selling = +values[0].innerText.replaceAll(',', '')
      result.buying = +values[1].innerText.replaceAll(',', '')
    }
    return result
  }
}
