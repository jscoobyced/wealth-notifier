import { CurrencyData } from '../model'
import SlackService from '../notifier/slack'
import SlackMessageBuilder from '../notifier/slackbuilder'
import { calculatGoldProfit, shouldBuyGold } from './profitCalculator'

export const notifyCurrencyChange = async (currencyData: CurrencyData[]) => {
  const slackBuilder = new SlackMessageBuilder()

  for (const message of currencyData) {
    await checkGoldData(message, slackBuilder)
  }

  const messages = slackBuilder.build()

  if (messages) {
    const slackService = new SlackService()
    await slackService.sendMessage(messages)
  }
}

const checkGoldData = async (
  goldData: CurrencyData,
  slackBuilder: SlackMessageBuilder,
) => {
  const profit = await calculatGoldProfit(goldData.currency, goldData.buying)
  if (profit > 0) {
    slackBuilder.addProfitData(goldData, profit)
  }
  const shouldBuy = await shouldBuyGold(goldData.currency, goldData.selling)
  if (shouldBuy) {
    slackBuilder.addShouldBuyData(goldData)
  }
}
