import axios from "axios";

const weatherApi = "https://api.openweathermap.org/data/2.5";
const currentWeatherApi = `${weatherApi}/weather`;
const forecastWeatherApi = `${weatherApi}/forecast`;

export const weatherIconUrl = "https://openweathermap.org/img/wn/";

const apiKey = import.meta.env.VITE_API_KEY;


export const fetchWeatherByCoords = async (geoData, lang = "en") => {
  if (!geoData?.latitude || !geoData?.longitude) return;

  const params = {
    lat: geoData.latitude,
    lon: geoData.longitude,
    units: "metric",
    lang,
    appid: apiKey,
  };

  const [current, forecast] = await Promise.all([
    axios.get(currentWeatherApi, { params }),
    axios.get(forecastWeatherApi, { params }),
  ]);

  return { currentWeather: current.data, forecast: forecast.data };
};

export const fetchWeatherByCity = async (searchQuery, lang = "en") => {
  if (!searchQuery) return;

  const params = {
    appid: apiKey,
    q: searchQuery,
    units: "metric",
    lang,
  };

  const [current, forecast] = await Promise.all([
    axios.get(currentWeatherApi, { params }),
    axios.get(forecastWeatherApi, { params }),
  ]);

  return { currentWeather: current.data, forecast: forecast.data };
};
