import {
  CurrencyData,
  IconWithTextContent,
  SlackMessageWithHeader,
  UpwardsTrend,
} from '../model'

export default class SlackMessageBuilder {
  private slackContent: IconWithTextContent[] = []
  private thaiBaht = Intl.NumberFormat('en-TH', {
    style: 'currency',
    currency: 'THB',
  })

  addCurrencyData = (currencyData: CurrencyData) => {
    this.slackContent.push({
      icon: currencyData.icon.slack,
      text: `The ${currencyData.provider} selling price for ${
        currencyData.currency
      } is ${this.thaiBaht.format(currencyData.selling)}.`,
    })
  }

  addProfitData = (goldData: CurrencyData, profit: number) => {
    this.slackContent.push({
      icon: goldData.icon.slack,
      text: `The ${goldData.provider} profit for gold is ${this.thaiBaht.format(
        profit
      )}.`,
    })
  }

  build = () => {
    if (this.slackContent.length > 0) {
      const message: SlackMessageWithHeader = {
        header: {
          icon: UpwardsTrend,
          messsage: `Price update`,
        },
        content: this.slackContent,
      }
      return message
    }
    return false
  }
}
