const TelegramBot = require("node-telegram-bot-api");
const { getForecast } = require("./weatherForecast");
const { getWeatherMarkup } = require("./weatherFormatter");

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "TELEGRAM_BOT_TOKEN";

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
      await bot.sendMessage(id, "Get the Ternopil Weather Forecast ⛈", menu);
      break;
    }

    case "Forecast in Ternopil": {
      const subMenu = {
        reply_markup: {
          keyboard: [["Every 3 hours", "Every 6 hours"]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      await bot.sendMessage(id, "Select the forecast interval 🌤", subMenu);
      break;
    }

    case "Every 3 hours":
    case "Every 6 hours": {
      const interval = text.includes("3") ? 3 : 6;
      const forecast = await getForecast();
      const weatherMarkup = getWeatherMarkup(forecast, interval);
      await bot.sendMessage(id, weatherMarkup, { parse_mode: "HTML" });
      break;
    }

    default:
      await bot.sendMessage(id, "Please select one of the provided options.");
      break;
  }
});
