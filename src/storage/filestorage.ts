import fs from 'fs'
import { PurchasedGoldData } from '../model'

export default class FileStorage {
  storeValue = async (path: string, value: number) => {
    await this.store(getSafePath(path), value)
  }

  retrieveValue = async (path: string) => {
    const safePath = getSafePath(path)
    if (!fs.existsSync(safePath)) return -1
    const read = await fs.promises.readFile(safePath)
    const value = +Buffer.from(read).toString() || 0
    return value
  }

  retrieveGoldValue = async (path: string) => {
    const safePath = getSafePath(path)
    if (!fs.existsSync(safePath)) return ''
    const read = await fs.promises.readFile(safePath)
    const value = Buffer.from(read).toString()
    return JSON.parse(value) as unknown as PurchasedGoldData
  }

  private store = async (safePath: string, value: number) => {
    await fs.promises.writeFile(safePath, `${value}`)
  }
}

export const getSafePath = (path: string) =>
  path.replaceAll('..', '').replaceAll('//', '/')
