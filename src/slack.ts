import { SlackMessageWithHeader } from './model'

export default class SlackService {
  private SLACK_WEBHOOK = process.env.SLACK_WEBHOOK
  sendMessage = async (message: SlackMessageWithHeader) => {
    if (!this.SLACK_WEBHOOK) return
    try {
      const data = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: `${message.header.icon} ${message.header.messsage}`,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'rich_text',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: message.content,
                  },
                ],
              },
            ],
          },
        ],
      }

      const response = await fetch(this.SLACK_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.text()
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
