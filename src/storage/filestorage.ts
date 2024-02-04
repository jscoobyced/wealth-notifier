import fs from 'fs'

export default class FileStorage {
  storeIfGreater = async (path: string, value: number) => {
    const safePath = this.getSafePath(path)
    const oldValue = await this.retrieve(safePath)
    const isGreater = oldValue < value
    if (isGreater) {
      await this.store(safePath, value)
    }
    return isGreater
  }

  storeIfLower = async (path: string, value: number) => {
    const safePath = this.getSafePath(path)
    const oldValue = await this.retrieve(safePath)
    const isLower = oldValue > value
    if (isLower) {
      await this.store(safePath, value)
    }
    return isLower
  }

  private retrieve = async (safePath: string) => {
    const read = await fs.promises.readFile(safePath)
    return +Buffer.from(read).toString()
  }

  private store = async (safePath: string, value: number) => {
    await fs.promises.writeFile(safePath, `${value}`)
  }

  private getSafePath = (path: string) =>
    path.replaceAll('..', '').replaceAll('//', '/')
}
