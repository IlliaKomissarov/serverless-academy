const axios = require("axios");

const TOKEN =
  process.env.WEATHER_API_TOKEN || "15c43b9af778f5a61f94739cd542693c";
const URL = "https://api.openweathermap.org/data/2.5/forecast";

const weatherAPI = axios.create({
  baseURL: URL,
  params: {
    appid: TOKEN,
    lat: 49.553516,
    lon: 25.594767,
  },
});

const getForecast = async (city) => {
  try {
    const res = await axios.get(
      `${URL}?appid=${TOKEN}&q=${city}&cnt=1&units=metric`
    );
    return prettifyForecast(res.data.list[0]);
  } catch (error) {
    console.log(error);
  }
};

const prettifyForecast = (data) => {
  const temp = Math.floor(+data.main.temp);
  const { main, description } = data.weather[0];
  const wind = data.wind.speed;
  return `${main}\n${description}\nTemperature: ${temp}°C\nWind Speed: ${wind} m/s`;
};

module.exports = { getForecast };