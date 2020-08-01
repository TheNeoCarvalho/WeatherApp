export default async function getCurrentWeather(locationCoords) {
  const axios = require("axios");

  const { latitude, longitude } = locationCoords;

  var results = [];

  await axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=740df5c4e1922ff2467000128a9bb1a6`
    )
    .then(function (response) {
      const data = response.data;
      const locationName = data.sys.country + ", " + " " + data.name;
      const temperatureMin = data.main.temp_min;
      const temperatureMax = data.main.temp_max;
      const wind = data.wind.speed;
      const humidity = data.main.humidity;
      const currentTemperature = data.main.temp;

      results = [
        currentTemperature,
        temperatureMin,
        temperatureMax,
        locationName,
        wind,
        humidity,
      ];
    })
    .catch(function (error) {
      console.log(error);
    });

  return results;
}
