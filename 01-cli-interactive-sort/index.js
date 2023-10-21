const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function userInput() {
  rl.question(
    "Hello. Enter 10 words or digits deviding them in spaces or write exit: ",
    (answer) => {
      if (answer.trim().toLowerCase() === "exit") {
        rl.close();
      } else {
        chooseOption(answer);
      }
    }
  );
}

function chooseOption(input) {
  const list = input.split(" ");
  rl.question(
    `
    How would you like to sort the values:
    1. Sort words alphabetically
    2. Show numbers from lesser to greater
    3. Show numbers from bigger to smaller
    4. Display words in ascending order by number of letters in the word
    5. Show only unique words
    6. Display only unique values from the set of words and numbers entered by the user
    Select (1 - 6) and press ENTER: `,
    (option) => {
      option = Number(option.trim());
      if (option >= 1 && option <= 6) {
        sorting(list, option);
      } else {
        console.log("this variant number does not exist");
        chooseOption(input);
      }
    }
  );
}

function sorting(list, option) {
  function sortNumbers(list, option) {
    const filteredList = list.filter((item) => !isNaN(item.trim()));

    switch (option) {
      case 2:
        return filteredList.sort((a, b) => a - b);
      case 3:
        return filteredList.sort((a, b) => b - a);
      case 4:
        return filteredList.sort((a, b) => a.length - b.length);
      default:
        return [];
    }
  }

  switch (option) {
    case 1:
      console.log(list.sort().join(" "));
      break;
    case 2:
    case 3:
    case 4:
      console.log(sortNumbers(list, option).join(" "));
      break;
    case 5:
      console.log(uniqueWords(list).join(" "));
      break;
    case 6:
      const uniqueSymbols = list.filter(
        (value, index, self) => self.indexOf(value) === index
      );
      console.log(uniqueSymbols.join(" "));
      break;
  }
  userInput();
}

function uniqueWords(array) {
  const uniqueSet = new Set(array.filter((word) => isNaN(word)));

  const returnArray = [...uniqueSet];

  return returnArray;
}

userInput();
