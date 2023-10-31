// bot.js
const TelegramBot = require("node-telegram-bot-api");
const { initializeBot } = require("./menu");
const { fetchExchangeRates } = require("./api");
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "6745222833:AAEYvEsQ9AKtOr-cssbtaQLLGWqmd2qLfMs";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

initializeBot(bot);
fetchExchangeRates(bot);
