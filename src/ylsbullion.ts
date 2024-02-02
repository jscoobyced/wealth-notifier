import { parse } from 'node-html-parser'
import { SlackContent } from './model'

export default class YlgBullion {
  private YLGBULLION_URL = process.env.YLGBULLION_URL || false

  fetchCurrentPrice = async (gold: string) => {

    if (!this.YLGBULLION_URL) return false

    const url = this.YLGBULLION_URL as string
    const response = await fetch(url)
    if (response.status !== 200) return false
    const html = await response.text()
    const root = parse(html)
    const value = root.querySelector(`[data-value="bar${gold}_tout"]`)?.text
    const slackContent:SlackContent = {
      icon: 'part_alternation_mark',
      text: `The YLG Bullion ${gold}% gold price is THB ${value}.`
    }
    return slackContent
  }
}
