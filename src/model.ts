export type IconWithTextContent = {
  icon?: string
  text: string
}

export type SlackRichTextElement = {
  type: string
  name?: string
  text?: string
}

export type SlackMessageWithHeader = {
  header: {
    icon: string
    messsage: string
  }
  content: IconWithTextContent[]
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

export type CurrencyData = {
  selling: number
  buying: number
  currency: string
  provider: string
  icon: IconProvider
  sellingThreshold: number
}

export type IconProvider = {
  slack?: string
}

export const GoldIcon: IconProvider = {
  slack: 'part_alternation_mark',
}

export const CoinIcon: IconProvider = {
  slack: 'coin',
}

export const Icons = {
  gold: GoldIcon,
  coin: CoinIcon,
}

export type YlgGoldData = {
  bar96: {
    tin: number
    tout: number
  }
  bar99: {
    tin: number
    tout: number
  }
}

export type PurchasedGoldData = {
  pricePurchased: number
  goldBahtPurchased: number
}

export const UpwardsTrend = ':chart_with_upwards_trend:'
export const DownwardsTrend = ':chart_with_downwards_trend:'
export const GRAM_PER_BAHT = 15.244
export const OUNCE_TO_GRAM = 31.1041
