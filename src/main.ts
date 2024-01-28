export const run = () => {
  const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK

  const NODE_ENV = process.env.NODE_ENV || 'development'
  console.log(SLACK_WEBHOOK, NODE_ENV)
}
