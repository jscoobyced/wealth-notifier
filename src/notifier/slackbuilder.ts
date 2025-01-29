import {
  CurrencyData,
  IconWithTextContent,
  MoneyBagIcon,
  PriceUpdateIcon,
  SlackMessageWithHeader,
  UpwardsTrendIcon,
} from '../model'

export default class SlackMessageBuilder {
  private slackContent: IconWithTextContent[] = []
  private thaiBaht = Intl.NumberFormat('en-TH', {
    style: 'currency',
    currency: 'THB',
  })

  addProfitData = (goldData: CurrencyData, profit: number) => {
    this.slackContent.push({
      icon: UpwardsTrendIcon,
      text: `The ${goldData.provider} profit for gold is ${this.thaiBaht.format(
        profit,
      )}.`,
    })
  }

  addShouldBuyData = (goldData: CurrencyData) => {
    this.slackContent.push({
      icon: MoneyBagIcon,
      text: `Buy now! The price of ${goldData.provider} gold is ${this.thaiBaht.format(
        goldData.buying,
      )}.`,
    })
  }

  build = () => {
    if (this.slackContent.length > 0) {
      const message: SlackMessageWithHeader = {
        header: {
          icon: `:${PriceUpdateIcon}:`,
          messsage: `Price update`,
        },
        content: this.slackContent,
      }
      return message
    }
    return false
  }
}
