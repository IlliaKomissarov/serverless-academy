const { readFile } = require("fs/promises");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

const getUserData = async () => {
  try {
    const data = await readFile(dataPath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const transformUserData = (data) => {
  const newData = data.reduce((acc, { user, startDate, endDate }) => {
    const existingUser = acc.find((el) => el.userId === user._id);

    if (existingUser) {
      existingUser.vacations.push({ startDate, endDate });
    } else {
      acc.push({
        userId: user._id,
        userName: user.name,
        vacations: [{ startDate, endDate }],
      });
    }

    return acc;
  }, []);

  return newData;
};

(async () => {
  try {
    const userData = await getUserData();
    const transformedData = transformUserData(userData);
    console.log(transformedData);
  } catch (error) {
    console.error(error.message);
  }
})();
