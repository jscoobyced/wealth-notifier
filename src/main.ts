import SlackService from './notifier/slack'
import SlackMessageBuilder from './notifier/slackbuilder'
import CurrencyService from './service/currencyservice'

export const run = async () => {
  const slackBuilder = new SlackMessageBuilder()
  const currencyService = new CurrencyService()
  const messages = await currencyService.run()
  if (messages) {
    messages.forEach((message) => {
      slackBuilder.addCurrencyData(message)
    })
  }

  const slackService = new SlackService()
  await slackService.sendMessage(slackBuilder.build())
}
