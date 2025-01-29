import FileStorage, { getSafePath } from '../storage/filestorage'

const fileStorage = new FileStorage()

const PROFIT_PRECISION = 2

export const calculatGoldProfit = async (
  currencySource: string,
  currentRate: number,
) => {
  const currentDataPath = getFilePathForCurrency(currencySource)
  const currentData = await fileStorage.retrieveGoldValue(currentDataPath)
  const profit = getFixedDecimal(
    currentRate * currentData.goldBahtPurchased - currentData.pricePurchased,
    PROFIT_PRECISION,
  )
  if (
    currentRate > currentData.latestHighestPrice ||
    profit > currentData.latestProfit
  ) {
    currentData.latestHighestPrice = currentRate
    currentData.latestProfit = profit
    await fileStorage.storeObject(currentDataPath, currentData)
    return profit
  }
  return -1
}

export const shouldBuyGold = async (
  currencySource: string,
  currentRate: number,
) => {
  const currentDataPath = getFilePathForCurrency(currencySource)
  const currentData = await fileStorage.retrieveGoldValue(currentDataPath)
  const percentDecreased = -getFixedDecimal(
    ((currentRate -
      currentData.pricePurchased / currentData.goldBahtPurchased) /
      currentRate) *
      100,
    2,
  )
  return percentDecreased > Number(process.env.GOLD_THRESHOLD ?? '100')
}

const getFilePathForCurrency = (currency: string) => {
  const path = process.env.STORAGE_PATH ?? '/tmp'
  const file = getSafePath(currency)
  return `${path}/${file}.json`
}

const getFixedDecimal = (value: number, decimalPlaces: number): number => {
  return parseFloat(value.toFixed(decimalPlaces))
}
