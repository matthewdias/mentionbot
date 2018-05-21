module.exports = (client) => {
  return `
Commands
\`\`\`
@${client.user.username} mode <channel|dm|off>: turn mentions on or off for your user and choose method
@${client.user.username} name <username|nickname|both|off>: turn on mentions for your names
@${client.user.username} add <1>, <2>, <3>: add phrases that you should be mentioned for
@${client.user.username} remove <1>, <2>, <3>: remove phrases that you should be mentioned for
@${client.user.username} list: list your settings and added mention phrases
@${client.user.username} channel #<channel name>: set channel for mentions to appear in (admin only)
@${client.user.username} init: Manually initialize server if bot isn't working (admin only)
@${client.user.username} help: display available commands\`\`\`
`
}
