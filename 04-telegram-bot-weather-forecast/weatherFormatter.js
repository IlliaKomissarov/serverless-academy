const getWeather = (data, interval = 3) => {
  const { list, city } = data;

  const forecast =
    interval === 6 ? list.filter((el, idx) => idx % 2 === 0) : [...list];

  let markup = `<b>🌈✨ Exciting Weather Forecast for ${city.name}, ${city.country}! ✨🌈</b>\n\n`;

  forecast
    .slice(0, 9)
    .forEach(({ weather, dt_txt, main, wind, clouds, pop }) => {
      markup += `<b>${dt_txt}</b>\nWeather: ${weather[0].main}, ${weather[0].description},\nTemperature: ${main.temp} °C,\nHumidity: ${main.humidity}%,\nPressure: ${main.pressure} mmHg,\nWind speed: ${wind.speed} m/s,\nClouds: ${clouds.all}%,\nProbability of precipitation: ${pop}%,\n\n`;
    });

  return markup;
};

module.exports = { getWeather };
