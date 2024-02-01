import MarketDataService from './marketdata'
import {
  GRAM_PER_BAHT,
  MarketDataRequest,
  OUNCE_TO_GRAM,
  SlackContent,
  SlackMessageWithHeader,
  UpwardsTrend,
} from './model'
import SlackService from './slack'
import YlgBullion from './ylsbullion'

export const run = async () => {
  const mdMessage = await checkMarketData()
  const ylgMessage = await checkYlgBullion()
  const slackContent = mdMessage.concat(ylgMessage)

  const slackService = new SlackService()
  const message: SlackMessageWithHeader = {
    header: {
      icon: UpwardsTrend,
      messsage: `Price update`,
    },
    content: slackContent,
  }
  await slackService.sendMessage(message)
}

const checkYlgBullion = async () => {
  const ylgBullion = new YlgBullion()
  const message = []
  const gold96 = await ylgBullion.fetchCurrentPrice('96')
  if (gold96) message.push(gold96)
  const gold99 = await ylgBullion.fetchCurrentPrice('99')
  if (gold99) message.push(gold99)

  return message
}

const checkMarketData = async () => {
  const ratio = OUNCE_TO_GRAM / GRAM_PER_BAHT
  const request: MarketDataRequest = {
    ratio,
    currency: 'XAUTHB',
  }
  const message = []
  const goldPrice = await checkMarketDataPrice(request)
  message.push(goldPrice)

  request.ratio = 1
  request.currency = 'EURTHB'
  const euroPrice = await checkMarketDataPrice(request)
  message.push(euroPrice)

  request.currency = 'USDTHB'
  const usdPrice = await checkMarketDataPrice(request)
  message.push(usdPrice)

  request.currency = 'JPYTHB'
  const jpyPrice = await checkMarketDataPrice(request)
  message.push(jpyPrice)

  return message
}

const checkMarketDataPrice = async (request: MarketDataRequest) => {
  const marketDataService = new MarketDataService()

  const thaiBaht = Intl.NumberFormat('en-TH', {
    style: 'currency',
    currency: 'THB',
  })
  const result = await marketDataService.fetchCurrentPrice(request)
  const formattedResult = thaiBaht.format(result)
  const slackContent: SlackContent = {
    icon: 'coin',
    text: `The MarquetData price of ${request.currency} is now: ${formattedResult}.`,
  }
  return slackContent
}
