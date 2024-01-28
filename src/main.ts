import MarketDataService from './marketdata'
import {
  GRAM_PER_BAHT,
  MarketDataRequest,
  OUNCE_TO_GRAM,
  SlackMessageWithHeader,
  UpwardsTrend,
} from './model'
import SlackService from './slack'

export const run = async () => {
  const marketDataService = new MarketDataService()
  const ratio = OUNCE_TO_GRAM / GRAM_PER_BAHT
  const request: MarketDataRequest = {
    ratio,
    currency: 'XAUTHB',
  }
  let thaiBaht = Intl.NumberFormat('en-TH', {
    style: 'currency',
    currency: 'THB',
  })
  const result = await marketDataService.fetchCurrentPrice(request)
  const goldPrice = thaiBaht.format(result)
  const slackService = new SlackService()
  const message: SlackMessageWithHeader = {
    header: {
      icon: UpwardsTrend,
      messsage: 'Current gold price',
    },
    content: `The price of gold is now: ${goldPrice}.`,
  }
  await slackService.sendMessage(message)
}
