export interface IconWithTextContent {
  icon?: string
  text: string
}

export interface SlackRichTextElement {
  type: string
  name?: string
  text?: string
}

export interface SlackMessageWithHeader {
  header: {
    icon: string
    messsage: string
  }
  content: IconWithTextContent[]
}

export interface CurrencyData {
  selling: number
  buying: number
  currency: string
  provider: string
  sellingThreshold: number
}

export interface IconProvider {
  slack?: string
}

export interface YlgGoldData {
  bar96: {
    tin: number
    tout: number
  }
  bar99: {
    tin: number
    tout: number
  }
}

export interface PurchasedGoldData {
  pricePurchased: number
  goldBahtPurchased: number
  latestHighestPrice: number
  latestProfit: number
}

export const PriceUpdateIcon = 'part_alternation_mark'
export const UpwardsTrendIcon = 'chart_with_upwards_trend'
export const DownwardsTrendIcon = 'chart_with_downwards_trend'
export const MoneyBagIcon = 'moneybag'
export const GRAM_PER_BAHT = 15.244
export const OUNCE_TO_GRAM = 31.1041
