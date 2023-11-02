const axios = require("axios");
const { endpoints } = require("./endpoints");

const getRequest = async (url, reqCount = 0) => {
  if (reqCount >= 3) {
    return ["Fail"];
  }
  reqCount += 1;
  try {
    const { data } = await axios.get(url);
    if (data) {
      return ["Success", data];
    }
  } catch (error) {
    return ["Fail"];
  }
  return getRequest(url, reqCount);
};

const sortJSON = async () => {
  let isDone = { true: 0, false: 0 };

  for (const endpoint of endpoints) {
    const [status, data] = await getRequest(endpoint);
    let msg = "The endpoint is unavailable.";

    if (data && data.isDone) {
      msg = `isDone - ${data.isDone}`;
      isDone[data.isDone] += 1;
      console.log(`[${status}] ${endpoint}: ${msg}`);
    }

    console.log(`[${status}] ${endpoint}: ${msg}`);
  }

  console.log(
    `\nFound True values: ${isDone.true},\nFound False values: ${isDone.false}`
  );
  return;
};

sortJSON();
