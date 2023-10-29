const TelegramBot = require("node-telegram-bot-api");
const { getWeather } = require("./weatherFormatter");
const { getForecast } = require("./weatherForecast");

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "6745222833:AAEYvEsQ9AKtOr-cssbtaQLLGWqmd2qLfMs";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const {
    chat: { id },
    text,
  } = msg;
  const ternopilForecastText = "Forecast in Ternopil ⛈";
  const forecastMenu = {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  switch (text) {
    case "/start": {
      forecastMenu.reply_markup.keyboard = [["Forecast in Ternopil"]];
      await bot.sendMessage(id, ternopilForecastText, forecastMenu);
      break;
    }

    case "Forecast in Ternopil": {
      forecastMenu.reply_markup.keyboard = [
        ["at intervals of 3 hours", "at intervals of 6 hours"],
      ];
      await bot.sendMessage(id, "Select the forecast interval 🌤", forecastMenu);
      break;
    }

    case "at intervals of 3 hours":
    case "at intervals of 6 hours": {
      const interval = text.includes("3") ? 3 : 6;
      const forecast = await getForecast();
      const weatherMarkup = getWeather(forecast, interval);
      await bot.sendMessage(id, weatherMarkup, { parse_mode: "HTML" });
      break;
    }

    default:
      await bot.sendMessage(id, "Try to select one of preset commands.");
      break;
  }
});
