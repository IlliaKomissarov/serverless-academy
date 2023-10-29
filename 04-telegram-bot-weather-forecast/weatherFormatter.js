const getWeatherMarkup = (data, interval = 3) => {
  const { list, city } = data;

  const forecast =
    interval === 6 ? list.filter((el, idx) => idx % 2 === 0) : [...list];

  let markup = `<b>⛈🌤☀️ Forecast for city: ${city.name}, ${city.country}</b>\n\n`;

  forecast
    .slice(0, 9)
    .forEach(({ weather, dt_txt, main, wind, clouds, pop }) => {
      markup += `
      <b>${dt_txt}</b>
      Weather: ${weather[0].main}, ${weather[0].description},
      Temperature: ${main.temp} °C,
      Humidity: ${main.humidity} %,
      Pressure: ${main.pressure} mmHg,
      Wind speed: ${wind.speed} meter/sec,
      Clouds: ${clouds.all} %,
      Probability of precipitation: ${pop} %\n\n`;
    });

  return markup;
};

module.exports = {
  getWeatherMarkup,
};
