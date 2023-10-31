// menu.js
const menusStack = [];

// Start menu with 1 button
const initialMenu = {
  reply_markup: {
    keyboard: [["Money exchange"]],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};

// Submenu with 3 buttons
const submenu = {
  reply_markup: {
    keyboard: [["USD", "EUR", "Return"]],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};

module.exports.initializeBot = function (bot) {
  bot.onText(/\/start/, (msg) => {
    let chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to Exchange report bot!", initialMenu);
    menusStack.push(initialMenu);
  });

  bot.on("message", (msg) => {
    let chatId = msg.chat.id;
    let text = msg.text;

    if (text === "Money exchange") {
      bot.sendMessage(chatId, "Select currency:", submenu);
      menusStack.push(submenu);
    } else if (text === "Return") {
      // If the user wants to return to the previous menu
      menusStack.pop();
      let previousMenu = menusStack[menusStack.length - 1];
      if (previousMenu) {
        bot.sendMessage(chatId, "Select currency:", previousMenu);
      } else {
        bot.sendMessage(chatId, "Welcome to Exchange report bot!", initialMenu);
        menusStack.push(initialMenu);
      }
    }
  });
};
