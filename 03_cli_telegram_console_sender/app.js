const { Command } = require("commander");
const TelegramBot = require("node-telegram-bot-api");

const program = new Command();
program.name("app").version("0.1.3");

const BOT_TOKEN =
  (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_BOT_TOKEN.trim()) ||
  "6745222833:AAEYvEsQ9AKtOr-cssbtaQLLGWqmd2qLfMs";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "474673236";

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

async function sendMsg(msg) {
  try {
    await bot.sendMessage(CHAT_ID, msg);
    process.exit(0);
  } catch (error) {
    console.log(error.code);
    console.log(error.response.body);
    process.exit(0);
  }
}

async function sendPhoto(photoUrl) {
  try {
    await bot.sendPhoto(CHAT_ID, photoUrl);
    console.log("You successfully sent the photo to your bot.");
    process.exit(0);
  } catch (error) {
    console.log(error.code);
    console.log(error.response.body);
    process.exit(0);
  }
}

program
  .command("send-message")
  .alias("m")
  .alias("message")
  .argument("<message>")
  .description("Send message to Telegram Bot.")
  .action(sendMsg);

program
  .command("send-photo")
  .alias("p")
  .alias("photo")
  .argument("<path>")
  .description(
    "Send photo to Telegram Bot. Just drag and drop it console after p-flag."
  )
  .action(sendPhoto);

program.parse();
