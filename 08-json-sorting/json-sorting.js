const axios = require("axios");
const { endpoints } = require("./endpoints");

const getRequest = async (url) => {
  try {
    const { data } = await axios.get(url);
    return ["Success", data];
  } catch (error) {
    return ["Fail"];
  }
};

const sortJSON = async () => {
  const isDone = { true: 0, false: 0 };

  const requests = endpoints.map(async (endpoint) => {
    const [status, data] = await getRequest(endpoint);
    let msg = "The endpoint is unavailable.";

    if (data && data.isDone) {
      msg = `isDone - ${data.isDone}`;
      isDone[data.isDone] += 1;
    }

    console.log(`[${status}] ${endpoint}: ${msg}`);
    return status;
  });

  const results = await Promise.all(requests);

  console.log(
    `\nFound True values: ${isDone.true},\nFound False values: ${isDone.false}`
  );
};

sortJSON();
