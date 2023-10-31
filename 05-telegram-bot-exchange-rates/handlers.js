// const { initialMenu, cache } = require("./menus");
// const axios = require("axios");
// const { submenu } = require("./menus");

// const handleStart = (bot, menusStack) => (msg) => {
//   let chatId = msg.chat.id;
//   bot.sendMessage(chatId, "Welcome to Exchange report bot!", initialMenu);
//   menusStack.push(initialMenu);
// };

// const handleMessage = (bot, menusStack) => async (msg) => {
//   let chatId = msg.chat.id;
//   let text = msg.text;

//   if (text === "Money exchange") {
//     bot.sendMessage(chatId, "Select currency:", submenu);
//     menusStack.push(submenu);
//   } else if (text === "USD" || text === "EUR") {
//     try {
//       let currencyDataPrivat = cache.get("currencyDataPrivat");
//       let currencyDataMono = cache.get("currencyDataMono");

//       if (!currencyDataPrivat) {
//         const responsePrivat = await axios.get(apiPrivat);
//         currencyDataPrivat = responsePrivat.data;
//         cache.set("currencyDataPrivat", currencyDataPrivat, 300);
//       }

//       if (!currencyDataMono) {
//         const responseMono = await axios.get(apiMono);
//         currencyDataMono = responseMono.data;
//         cache.set("currencyDataMono", currencyDataMono, 400);
//       }

//       console.log("Currency Data Privat:", currencyDataPrivat);
//       console.log("Currency Data Mono:", currencyDataMono);

//       const selectedPrivat = currencyDataPrivat.find(
//         (currency) => currency.ccy === text
//       );
//       const selectedMonoUsd = currencyDataMono.find(
//         (mono) => mono.currencyCodeA === 840
//       );
//       const selectedMonoEur = currencyDataMono.find(
//         (mono) => mono.currencyCodeA === 978
//       );

//       if (selectedPrivat) {
//         const buyRate = selectedPrivat.buy;
//         const sellRate = selectedPrivat.sale;
//         bot.sendMessage(
//           chatId,
//           `Current ${text} Exchange Rates in PrivatBank:\nBuy Rate: ${buyRate}\nSell Rate: ${sellRate}`
//         );
//       } else {
//         bot.sendMessage(
//           chatId,
//           `Exchange rate data not available for ${text}.`
//         );
//       }

//       if (selectedMonoUsd && text === "USD") {
//         const buyRateMono = selectedMonoUsd.rateBuy;
//         const sellRateMono = selectedMonoUsd.rateSell;
//         bot.sendMessage(
//           chatId,
//           `Current ${text} Exchange Rates in MonoBank:\nBuy Rate: ${buyRateMono}\nSell Rate: ${sellRateMono}`
//         );
//       } else if (selectedMonoEur && text === "EUR") {
//         const buyRateMono = selectedMonoEur.rateBuy;
//         const sellRateMono = selectedMonoEur.rateSell;
//         bot.sendMessage(
//           chatId,
//           `Current ${text} Exchange Rates in MonoBank:\nBuy Rate: ${buyRateMono}\nSell Rate: ${sellRateMono}`
//         );
//       } else {
//         bot.sendMessage(
//           chatId,
//           `Exchange rate data not available for ${text}.`
//         );
//       }
//     } catch (error) {
//       bot.sendMessage(chatId, `Error fetching ${text} exchange rates.`);
//     }
//   } else if (text === "Return") {
//     menusStack.pop();
//     let previousMenu = menusStack[menusStack.length - 1];
//     if (previousMenu) {
//       bot.sendMessage(chatId, "Select currency:", previousMenu);
//     } else {
//       bot.sendMessage(chatId, "Welcome to Exchange report bot!", initialMenu);
//       menusStack.push(initialMenu);
//     }
//   }
// };

// module.exports = { handleStart, handleMessage };
