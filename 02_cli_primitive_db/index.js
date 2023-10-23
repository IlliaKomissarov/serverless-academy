import fs from "fs";
import inquirer from "inquirer";

const usersDataFile = "database.txt";
let usersList = [];

const loadUsers = () => {
  try {
    const data = fs.readFileSync(usersDataFile, "utf8").split("\n");
    usersList = data
      .filter((user) => user.trim() !== "")
      .map((user) => JSON.parse(user));
  } catch (error) {
    console.log("Error loading user data: " + error);
  }
};

const createUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the user's name. To cancel press ENTER: ",
      },
    ])
    .then((answers) => {
      if (!answers.name) {
        searchUser();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "gender",
              message: "Choose your Gender",
              choices: ["male", "female"],
            },
            {
              type: "number",
              name: "age",
              message: "Enter your age",
            },
          ])
          .then((userAnswers) => {
            const user = {
              name: answers.name,
              gender: userAnswers.gender,
              age: userAnswers.age,
            };
            addUser(user);
            createUser();
          });
      }
    });
};

const addUser = (user) => {
  fs.appendFileSync(usersDataFile, JSON.stringify(user) + "\n");
  usersList.push(user);
  console.log("All users:", usersList);
};

const searchUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "searchUser",
        message: "Would you like to search the values in DB? (y/n)",
      },
    ])
    .then((answers) => {
      if (answers.searchUser.toLowerCase() === "n") {
        process.exit();
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "searchUserName",
              message: "Enter user's name you want to find in DB: ",
            },
          ])
          .then((searchInfo) => {
            const searchName = searchInfo.searchUserName.trim().toLowerCase();
            const foundUsers = usersList.filter((user) =>
              user.name.toLowerCase().includes(searchName)
            );


            if (foundUsers.length > 0) {
              console.log(`User ${searchName} was found.`);
              console.log(foundUsers);
            } else {
              console.log(`Users ${searchName} weren't found.`);
            }
          });
      }
    });
};

loadUsers();
createUser();
