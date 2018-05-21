This is a discord bot that can mention you when specific phrases you set are used by others in chat. It was created to replicate the highlight word functionality from Slack and Skype.

#### Commands

```
@mentionbot mode <channel|dm|off> : turn mentions on or off for your user and choose method
@mentionbot name <username|nickname|both|off> : turn on mentions for your names
@mentionbot add <1>, <2>, <3> : add phrases that you should be mentioned for
@mentionbot remove <1>, <2>, <3> : remove phrases that you should be mentioned for
@mentionbot list : list your settings and added mention phrases
@mentionbot channel #<channel name> : set channel for mentions to appear in (admin only)
@mentionbot init : Manually initialize server if bot isn't working (admin only)
@mentionbot help : display available commands
```

#### Installation

##### Use our hosted instance

[Invite to server](https://discordapp.com/oauth2/authorize?client_id=446120627540328448&scope=bot&permissions=19456)

##### Or host it yourself

1. Create a Discord bot [here](https://discordapp.com/developers/applications/me/create)
2. Deploy the app

    [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

3. Invite it to a server at `https://discordapp.com/oauth2/authorize?client_id=<your bot client id>&scope=bot&permissions=19456`

#### Usage

- If the bot was already in your server before you deployed the app, you may need to run the `init` command to get everything working
- Admins must set a mentions channel using the `channel` command before users can select the channel mode
- To enable mentions for your user you need to
  1. Choose a mode with the `mode` command
  2. Choose a name option with the `name` command (optional)
  3. Choose mention phrases using the `add` command

#### Privacy Policy

Your messages are never stored. Anonymous data that contains your settings is stored on a secure private database.

#### Development

##### Dependencies

1. A PostgreSQL Database
  - Download from https://www.postgresql.org/
  - Create a database
2. Node.js
  - Install from https://nodejs.org/

##### Running

1. run `npm install`
2. set environment variables
  - `DATABASE_URL`: connection url to your database in the form `"postgres://<username>:<password>@<host>:<ip>/<db name>"`
  - `CLIENT_ID`: Discord bot client. Get one [here](https://discordapp.com/developers/applications/me/create)
  - `TOKEN`: Discord bot token. Get one [here](https://discordapp.com/developers/applications/me/create)
3. run `npm start`
