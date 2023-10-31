// bot.js
const TelegramBot = require("node-telegram-bot-api");
const { initializeBot } = require("./menu");
const { fetchExchangeRates } = require("./api");

const token = "6745222833:AAEYvEsQ9AKtOr-cssbtaQLLGWqmd2qLfMs"; // Bot token

const bot = new TelegramBot(token, { polling: true });

initializeBot(bot);
fetchExchangeRates(bot);
