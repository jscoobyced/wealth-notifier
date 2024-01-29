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
  const ratio = OUNCE_TO_GRAM / GRAM_PER_BAHT
  const request: MarketDataRequest = {
    ratio,
    currency: 'XAUTHB',
  }
  const goldPrice = await checkPrice(request)

  request.ratio = 1
  request.currency = 'EURTHB'
  const euroPrice = await checkPrice(request)

  request.ratio = 1
  request.currency = 'USDTHB'
  const usdPrice = await checkPrice(request)

  request.ratio = 1
  request.currency = 'JPYTHB'
  const jpyPrice = await checkPrice(request)

  const message: SlackMessageWithHeader = {
    header: {
      icon: UpwardsTrend,
      messsage: `Price update`,
    },
    content: `${goldPrice}\n${euroPrice}\n${usdPrice}\n${jpyPrice}`,
  }

  const slackService = new SlackService()
  await slackService.sendMessage(message)
}

const checkPrice = async (request: MarketDataRequest) => {
  const marketDataService = new MarketDataService()

  const thaiBaht = Intl.NumberFormat('en-TH', {
    style: 'currency',
    currency: 'THB',
  })
  const result = await marketDataService.fetchCurrentPrice(request)
  const formattedResult = thaiBaht.format(result)
  return `The price of ${request.currency} is now: ${formattedResult}.`

}
