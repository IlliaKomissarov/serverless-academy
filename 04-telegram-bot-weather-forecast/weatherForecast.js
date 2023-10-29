const axios = require("axios");

const TOKEN = process.env.WEATHER_API_TOKEN || "WEATHER_API_TOKEN";

const weatherAPI = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast",
  params: {
    appid: TOKEN,
    lat: "49.553516",
    lon: "25.594767",
  },
});

const getForecast = async () => {
  try {
    const { data } = await weatherAPI.get();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getForecast };
