const { readFile } = require("fs/promises");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

const getUserData = async () => {
  try {
    const data = await readFile(dataPath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error.message);
    process.exit(0);
  }
};

const transformUserData = (data) => {
  const newData = [];

  for (const { user, startDate, endDate } of data) {
    const idx = newData.findIndex((el) => {
      return el.userId === user._id;
    });

    if (!!~idx) {
      newData[idx].vacations = [
        ...newData[idx].vacations,
        { startDate, endDate },
      ];
    } else {
      newData.push({
        userId: user._id,
        userName: user.name,
        vacations: [{ startDate, endDate }],
      });
    }
  }

  return newData;
};

getUserData().then((res) => {
  const newResponce = transformUserData(res);
  console.log(newResponce);
});
