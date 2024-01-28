export type SlackMessageWithHeader = {
  header: {
    icon: string
    messsage: string
  }
  content: string
}

export type MarketDataRequest = {
  ratio: number
  currency: string
}

export type MarketDataResponse = {
  endpoint: string
  quotes: [
    {
      ask: number
      base_currency: string
      bid: number
      mid: number
      quote_currency: string
    }
  ]
  requested_time: string
  timestamp: number
}

export const UpwardsTrend = ':chart_with_upwards_trend:'
export const DownwardsTrend = ':chart_with_downwards_trend:'
export const GRAM_PER_BAHT = 15.244
export const OUNCE_TO_GRAM = 31.1041
