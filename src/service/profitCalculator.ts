import FileStorage, { getSafePath } from '../storage/filestorage'

const fileStorage = new FileStorage()

export const calculatGoldProfit = async (
  currencySource: string,
  currentRate: number
) => {
  const currentDataPath = getFilePathForCurrency(currencySource)
  const currentData = await fileStorage.retrieveGoldValue(currentDataPath)
  if (currentData === '') return 0
  const pricePurchased = currentData.pricePurchased
  const goldBahtPurchased = currentData.goldBahtPurchased
  const latestHighestPrice = currentData.latestHighestPrice ?? 0
  const latestProfit = currentData.latestProfit ?? 0
  const profit = +(currentRate * goldBahtPurchased - pricePurchased).toFixed(5)
  if (currentRate > latestHighestPrice || profit > latestProfit) {
    currentData.latestHighestPrice = currentRate
    currentData.latestProfit = profit
    await fileStorage.storeObject(currentDataPath, currentData)
    return profit
  }
  return -1
}

const getFilePathForCurrency = (currency: string) => {
  const path = process.env.STORAGE_PATH || '/tmp'
  const file = getSafePath(currency)
  return `${path}/${file}.json`
}
