import { CurrencyData } from '../model'
import SlackService from '../notifier/slack'
import SlackMessageBuilder from '../notifier/slackbuilder'
import FileStorage, { getSafePath } from '../storage/filestorage'
import { calculatGoldProfit } from './profitCalculator'

export default class NotificationService {
  run = async (currencyData: CurrencyData[]) => {
    const slackBuilder = new SlackMessageBuilder()

    for (const message of currencyData) {
      await this.checkGoldData(message, slackBuilder)
    }

    const messages = slackBuilder.build()

    if (messages) {
      const slackService = new SlackService()
      await slackService.sendMessage(messages)
    }
  }

  private checkGoldData = async (
    goldData: CurrencyData,
    slackBuilder: SlackMessageBuilder
  ) => {
    const profit = await calculatGoldProfit(goldData.currency, goldData.buying)
    if (profit > 0) {
      slackBuilder.addProfitData(goldData, profit)
    }
  }

  private checkCurrencyData = async (
    currencyData: CurrencyData,
    slackBuilder: SlackMessageBuilder
  ) => {
    const fileStorage = new FileStorage()
    const path = this.getFilePathForCurrency(currencyData.currency)
    const oldValue = await fileStorage.retrieveValue(path)
    if (oldValue < 0) {
      fileStorage.storeValue(path, currencyData.selling)
      return
    }
    const percent = (100 * (oldValue - currencyData.selling)) / oldValue

    const threshold = +(process.env.CURRENCY_THRESHOLD || 101)
    if (
      percent >= threshold ||
      currencyData.selling <= currencyData.sellingThreshold
    ) {
      slackBuilder.addCurrencyData(currencyData)
      fileStorage.storeValue(path, currencyData.selling)
    }
  }

  private getFilePathForCurrency = (currency: string) => {
    const path = process.env.STORAGE_PATH || '/tmp'
    const file = getSafePath(currency)
    return `${path}/${file}.txt`
  }
}
