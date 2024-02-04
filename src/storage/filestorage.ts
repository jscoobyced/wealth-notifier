import fs from 'fs'

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

  private store = async (safePath: string, value: number) => {
    await fs.promises.writeFile(safePath, `${value}`)
  }
}

export const getSafePath = (path: string) =>
  path.replaceAll('..', '').replaceAll('//', '/')
