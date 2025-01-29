import * as fs from 'fs'
import { PurchasedGoldData } from '../model'

export default class FileStorage {
  storeObject = async (path: string, value: object) => {
    await this.store(getSafePath(path), JSON.stringify(value))
  }

  retrieveGoldValue = async (path: string): Promise<PurchasedGoldData> => {
    const safePath = getSafePath(path)
    if (!fs.existsSync(safePath))
      return {
        pricePurchased: 0,
        goldBahtPurchased: 0,
        latestHighestPrice: 0,
        latestProfit: 0,
      }
    const read = await fs.promises.readFile(safePath)
    const value = Buffer.from(read).toString()
    return JSON.parse(value) as unknown as PurchasedGoldData
  }

  private store = async (safePath: string, value: string) => {
    await fs.promises.writeFile(safePath, value)
  }
}

export const getSafePath = (path: string) =>
  path.replace(/\.\./g, '').replace(/\/\//g, '/')
