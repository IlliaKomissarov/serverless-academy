const TelegramBot = require("node-telegram-bot-api");
const { handleStart, handleMessage } = require("./handlers");
const { initialMenu, submenu } = require("./menus");

const token = "6745222833:AAEYvEsQ9AKtOr-cssbtaQLLGWqmd2qLfMs";
const apiPrivat = "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";
const apiMono = "https://api.monobank.ua/bank/currency";

const bot = new TelegramBot(token, { polling: true });

const menusStack = [];

bot.onText(/\/start/, handleStart(bot, initialMenu, menusStack));
bot.on("message", handleMessage(bot, menusStack));
