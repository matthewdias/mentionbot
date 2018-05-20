const Discord = require('discord.js')
const http = require('http')
const db = require('./db')
const { add, remove, list, mode, name, channel, help } = require('../commands')
const PhraseBank = require('./PhraseBank')

const client = new Discord.Client()

client.on('ready', () => {
  console.log('Discord client ready')
  client.user.setActivity('@mentionbot for help')
})

client.on('guildCreate', guild => db.createGuild(guild.id))
client.on('guildDelete', guild => db.destroyGuild(guild.id))

client.on('guildMemberUpdate', async (_, newMember) => {
  await db.setNickname(newMember)
  phraseBank.addPhrases(newMember.guild.id, [newMember.nickname])
})

client.on('userUpdate', async (_, newUser) => {
  let users = await db.setUsername(newUser)
  let guilds = users.map(user => user.guildId)
  Array.from(new Set(guilds)).map(guildId => phraseBank.addPhrases(guildId, [newUser.username]))
})

client.on('message', async (message) => {
  try {
    if (message.author.id == client.user.id) {
      return
    }

    if (message.channel.type != 'text') {
      message.channel.send(`this bot doesn't respond to DMs.`)
      return
    }

    if (message.content.startsWith(`<@${process.env.CLIENT_ID}>`)) {
      let command = message.content.replace(`<@${process.env.CLIENT_ID}> `, '')
      console.log(message.author.username + ':', command)

      let response
      if (command.startsWith('add ')) {
        response = await add(message, command.replace('add ', ''), phraseBank)
      } else if (command.startsWith('remove ')) {
        response = await remove(message, command.replace('remove ', ''))
      } else if (command.startsWith('list')) {
        response = await list(message)
      } else if (command.startsWith('mode ')) {
        response = await mode(message, command.replace('mode ', ''))
      } else if (command.startsWith('name ')) {
        response = await name(message, command.replace('name ', ''))
      } else if (command.startsWith('channel ')) {
        response = await channel(message, command.replace('channel ', ''))
      } else response = help(message)

      await message.channel.send(response)
      return
    }

    if (phraseBank.hasGuild(message.guild.id)) {
      let phrases = phraseBank.findMatches(message.guild.id, message.content)
      let mentionees = await db.getMentionees(message.guild.id, message.author.id, phrases)
      if (!mentionees) {
        return
      }
      let guild = await db.getGuild(message.guild.id)
      mentionees.map(async (mentionee) => {
        if (mentionee.mode == 'dm') {
          let dmChannel = await client.users.get(mentionee.id).createDM()
          dmChannel.send(`<@${message.author.id}> mentioned you in <#${message.channel.id}>`)
        } else if (mentionee.mode == 'channel') {
          let channel = await client.channels.get(guild.channelId)
          channel.send(`<@${mentionee.id}>, @${message.member.nickname} mentioned you in <#${message.channel.id}>`)
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
})

client.login(process.env.TOKEN)

http.createServer().listen(process.env.PORT)

let phraseBank
db.getGuildsWithPhrases().then((guildsWithPhrases) => {
  phraseBank = new PhraseBank(guildsWithPhrases)
})
