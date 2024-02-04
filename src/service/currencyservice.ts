import {
  CurrencyData,
  GRAM_PER_BAHT,
  MarketDataRequest,
  OUNCE_TO_GRAM,
} from '../model'
import Aurora from '../provider/aurora'
import MarketDataService from '../provider/marketdata'

export default class CurrencyService {
  run = async () => {
    const messages: CurrencyData[] = []
    const mdMessages = await this.checkMarketData()
    if (mdMessages) {
      mdMessages.forEach((message) => {
        messages.push(message)
      })
    }

    const auroraMessage = await this.checkAurora()
    if (auroraMessage) {
      messages.push(auroraMessage)
    }

    return messages
  }

  private checkAurora = async () => {
    const aurora = new Aurora()
    const auroraMessage = await aurora.fetchCurrentPrice()
    return auroraMessage
  }

  private checkMarketData = async () => {
    const ratio = OUNCE_TO_GRAM / GRAM_PER_BAHT
    const request: MarketDataRequest = {
      ratio,
      currency: 'XAUTHB',
    }
    const message: CurrencyData[] = []
    const goldPrice = await this.checkMarketDataPrice(request)
    if (goldPrice) message.push(goldPrice)

    request.ratio = 1
    request.currency = 'EURTHB'
    const euroPrice = await this.checkMarketDataPrice(request)
    if (euroPrice) message.push(euroPrice)

    request.currency = 'USDTHB'
    const usdPrice = await this.checkMarketDataPrice(request)
    if (usdPrice) message.push(usdPrice)

    request.currency = 'JPYTHB'
    const jpyPrice = await this.checkMarketDataPrice(request)
    if (jpyPrice) message.push(jpyPrice)

    request.currency = 'CNYTHB'
    const cnyPrice = await this.checkMarketDataPrice(request)
    if (cnyPrice) message.push(cnyPrice)

    return message
  }

  private checkMarketDataPrice = async (request: MarketDataRequest) => {
    const marketDataService = new MarketDataService()

    const result = await marketDataService.fetchCurrentPrice(request)
    return result
  }
}
