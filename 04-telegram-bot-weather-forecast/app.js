const TelegramBot = require("node-telegram-bot-api");
const { getForecast } = require("./weatherForecast");
const { getWeatherMarkup } = require("./weatherFormatter");

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "6745222833:AAEYvEsQ9AKtOr-cssbtaQLLGWqmd2qLfMs";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const {
    chat: { id },
    text,
  } = msg;

  switch (text) {
    case "/start": {
      const menu = {
        reply_markup: {
          keyboard: [["Forecast in Ternopil"]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      await bot.sendMessage(id, "Forecast in Ternopil ⛈", menu);
      break;
    }

    case "Forecast in Ternopil": {
      const subMenu = {
        reply_markup: {
          keyboard: [["at intervals of 3 hours", "at intervals of 6 hours"]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      await bot.sendMessage(id, "Select the forecast interval 🌤", subMenu);
      break;
    }

    case "at intervals of 3 hours":
    case "at intervals of 6 hours": {
      const interval = text.includes("3") ? 3 : 6;
      const forecast = await getForecast();
      const weatherMarkup = getWeatherMarkup(forecast, interval);
      await bot.sendMessage(id, weatherMarkup, { parse_mode: "HTML" });
      break;
    }

    default:
      await bot.sendMessage(id, "Try to select one of preset commands.");
      break;
  }
});
