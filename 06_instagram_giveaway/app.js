const { readFile, readdir } = require("fs/promises");
const path = require("path");

const DIR_PATH = path.join(__dirname, "users");

const getFilesList = async (dirPath) => {
  try {
    return await readdir(dirPath);
  } catch (error) {
    handleErrorMessage(error);
  }
};

const getFileData = async (filePath, fileName) => {
  try {
    const listPath = path.join(filePath, fileName);
    return await readFile(listPath, "utf8");
  } catch (error) {
    handleErrorMessage(error);
  }
};

const handleErrorMessage = (error) => {
  console.log(error.message);
  process.exit(0);
};

const processUserLists = async (dirPath, condition) => {
  const startTime = performance.now();
  const allUsers = {};

  const usersLists = await getFilesList(dirPath);

  for (const userList of usersLists) {
    const data = await getFileData(dirPath, userList);
    const users = data.split("\n");
    const uniqueUsers = [...new Set(users)];

    for (const user of uniqueUsers) {
      allUsers[user] = allUsers[user] ? allUsers[user] + 1 : 1;
    }
  }

  const countUsers = Object.values(allUsers).filter((user) =>
    condition(user, usersLists.length)
  ).length;

  const endTime = performance.now();
  return `Users: ${countUsers}. Time of execution: ${(
    endTime - startTime
  ).toFixed(3)}ms`;
};

const existInAtleastTen = async (dirPath) => {
  const condition = (user, listLength) => user >= 10;
  return processUserLists(dirPath, condition);
};

const existInAllFiles = async (dirPath) => {
  const condition = (user, listLength) => user === listLength;
  return processUserLists(dirPath, condition);
};

const uniqueValues = async (dirPath) => {
  const startTime = performance.now();
  let allUsers = [];

  const usersLists = await getFilesList(dirPath);

  for (const userList of usersLists) {
    const data = await getFileData(dirPath, userList);
    const users = data.split("\n");
    allUsers.push(...users);
  }

  const uniqueUsers = [...new Set(allUsers)];
  const endTime = performance.now();

  return `Unique users: ${uniqueUsers.length}. Time of execution: ${(
    endTime - startTime
  ).toFixed(3)}ms`;
};

const getResults = async () => {
  try {
    const uniqueUsers = await uniqueValues(DIR_PATH);
    console.log(uniqueUsers);

    const usersInAllFiles = await existInAllFiles(DIR_PATH);
    console.log(usersInAllFiles);

    const usersInTenFiles = await existInAtleastTen(DIR_PATH);
    console.log(usersInTenFiles);
  } catch (error) {
    handleErrorMessage(error);
  }
};

getResults();
