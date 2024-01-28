import { SlackMessageWithHeader } from './model'

export default class SlackService {
  private SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || false

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

      const url = this.SLACK_WEBHOOK.toString()
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.text()
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
