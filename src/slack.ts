import { SlackMessageWithHeader, SlackRichTextElement } from './model'

export default class SlackService {
  private SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || false

  sendMessage = async (message: SlackMessageWithHeader) => {
    if (!this.SLACK_WEBHOOK) return
    try {
      const blockElements: SlackRichTextElement[] = []
      message.content.forEach((content) => {
        blockElements.push({
          type: 'emoji',
          name: content.icon,
        })
        blockElements.push({
          type: 'text',
          text: content.text,
        })
        blockElements.push({
          type: 'text',
          text: `\n`,
        })
      })
      const elements = blockElements.slice(0, blockElements.length - 1)
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
                elements: elements,
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

      await response.text()
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
