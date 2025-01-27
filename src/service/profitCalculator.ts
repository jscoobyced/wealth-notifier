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
  const currentValue = currentRate * goldBahtPurchased
  return currentValue - pricePurchased
}

const getFilePathForCurrency = (currency: string) => {
  const path = process.env.STORAGE_PATH || '/tmp'
  const file = getSafePath(currency)
  return `${path}/${file}.json`
}
