import { parse } from 'node-html-parser'
import { SlackContent } from './model'

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
    const keys = ['selling', 'buying']
    const slackContent: SlackContent[] = values.map((value, index) => {
      return {
        icon: 'part_alternation_mark',
        text: `The Aurora ${keys[index]} gold price is THB ${value.innerText}.`,
      }
    })
    return slackContent
  }
}
