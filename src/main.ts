import Aurora from './provider/aurora'
import MarketDataService from './provider/marketdata'
import {
  GRAM_PER_BAHT,
  MarketDataRequest,
  OUNCE_TO_GRAM,
  Icons,
  CurrencyData,
} from './model'
import SlackService from './notifier/slack'
import SlackMessageBuilder from './slackbuilder'

export const run = async () => {
  const slackBuilder = new SlackMessageBuilder()

  const mdMessages = await checkMarketData()
  if (mdMessages) {
    mdMessages.forEach((message) => {
      slackBuilder.addCurrencyData(message, Icons.coin.slack, 'MarketData')
    })
  }

  const auroraMessage = await checkAurora()
  if (auroraMessage) {
    slackBuilder.addCurrencyData(auroraMessage, Icons.gold.slack, 'Aurora')
  }

  const slackService = new SlackService()
  await slackService.sendMessage(slackBuilder.build())
}

const checkAurora = async () => {
  const aurora = new Aurora()
  const auroraMessage = await aurora.fetchCurrentPrice()
  return auroraMessage
}

const checkMarketData = async () => {
  const ratio = OUNCE_TO_GRAM / GRAM_PER_BAHT
  const request: MarketDataRequest = {
    ratio,
    currency: 'XAUTHB',
  }
  const message: CurrencyData[] = []
  const goldPrice = await checkMarketDataPrice(request)
  if (goldPrice) message.push(goldPrice)

  request.ratio = 1
  request.currency = 'EURTHB'
  const euroPrice = await checkMarketDataPrice(request)
  if (euroPrice) message.push(euroPrice)

  request.currency = 'USDTHB'
  const usdPrice = await checkMarketDataPrice(request)
  if (usdPrice) message.push(usdPrice)

  request.currency = 'JPYTHB'
  const jpyPrice = await checkMarketDataPrice(request)
  if (jpyPrice) message.push(jpyPrice)

  request.currency = 'CNYTHB'
  const cnyPrice = await checkMarketDataPrice(request)
  if (cnyPrice) message.push(cnyPrice)

  return message
}

const checkMarketDataPrice = async (request: MarketDataRequest) => {
  const marketDataService = new MarketDataService()

  const result = await marketDataService.fetchCurrentPrice(request)
  return result
}
