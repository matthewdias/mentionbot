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

#### Privacy Policy

Your messages are never stored. Anonymous data that contains your settings is stored on a secure private database.
