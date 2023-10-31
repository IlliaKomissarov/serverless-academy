# Telegram Exchange Rate Bot

To run this project, you need to add the following environment variables to your .env file:

```
TELEGRAM_BOT_TOKEN=<TELEGRAM_TOKEN>
TELEGRAM_CHAT_ID=<CHAT_ID>
```

## Use CLI

Run it:

```bash
env $(cat .env | xargs) node app.js <command>
```

To see all command options:

```bash
env $(cat .env | xargs) node app.js --help