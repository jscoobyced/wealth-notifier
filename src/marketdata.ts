import { MarketDataRequest, MarketDataResponse } from "./model"

export default class MarketDataService {
  private MARKETDATA_API_URL = process.env.MARKETDATA_API_URL || false
  private MARKETDATA_API_KEY = process.env.MARKETDATA_API_KEY || false

  fetchCurrentPrice = async (request: MarketDataRequest) => {
    if(!this.MARKETDATA_API_KEY || !this.MARKETDATA_API_URL) return -1
    const url = `${this.MARKETDATA_API_URL.toString()}/live?api_key=${this.MARKETDATA_API_KEY.toString()}&currency=${request.currency}`
    const response = await fetch(url)
    const data: MarketDataResponse = await response.json() as MarketDataResponse
    data.quotes.map(quote => {
      quote.ask = +(quote.ask / request.ratio).toFixed(2)
      quote.bid = +(quote.bid / request.ratio).toFixed(2)
      quote.mid = +(quote.mid / request.ratio).toFixed(2)
    })
    return data.quotes[0].mid
  }
}
