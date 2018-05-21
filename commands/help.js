module.exports = (message) => {
  return `
  \`\`\`
commands
--------
@mentionbot mode <channel|dm|off> : turn mentions on or off for your user and choose method
@mentionbot name <username|nickname|both|off> : turn on mentions for your names
@mentionbot add <1>, <2>, <3> : add phrases that you should be mentioned for
@mentionbot remove <1>, <2>, <3> : remove phrases that you should be mentioned for
@mentionbot list : list your settings and added mention phrases
@mentionbot channel #<channel name> : set channel for mentions to appear in (admin only)
@mentionbot help : display available commands
  \`\`\`
  `
}
