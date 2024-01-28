import { SlackMessageWithHeader, UpwardsTrend } from './model'
import SlackService from './slack'

export const run = async () => {
  const slackService = new SlackService()
  const message: SlackMessageWithHeader = {
    header: {
      icon: UpwardsTrend,
      messsage: 'Gold Price is up!',
    },
    content: 'The price of gold is now: 33,100 THB. Down from 34,100 THB.',
  }
  await slackService.sendMessage(message)
}
