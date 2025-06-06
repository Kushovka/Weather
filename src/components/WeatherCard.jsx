import React from "react";
import { getFormatedDate } from "../utils";
import { weatherIconUrl } from "../services/api";

const translations = {
  en: {
    placeholder: "Enter city name ...",
    button: "Search",
    forecastTitle: "Forecast Weather",
    loading: "Loading...",
    error: "Error",
    currentWeatherFor: "Current Weather for",
    currentWeather: "Current Weather",
    feels: "Feels like",
  },
  ru: {
    placeholder: "Введите город ...",
    button: "Поиск",
    forecastTitle: "Прогноз погоды",
    loading: "Загрузка...",
    error: "Ошибка",
    currentWeatherFor: "Текущая погода в",
    currentWeather: "Текущая погода",
    feels: "Ощущается как",
  },
};

const WeatherCard = ({ data, lang = "en" }) => {
  const { name, main, weather, sys } = data;
  const t = translations[lang] || translations.en;
  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-4xl font-semibold pt-16 text-black/80">
        {t.currentWeatherFor} {name}, {sys.country}
      </h2>
      <h3 className="text-lg pb-8 text-black/60">{getFormatedDate(lang)}</h3>
      <h3 className="mt-2 mb-2 text-xl font-semibold text-black/80">
        {t.currentWeather}
      </h3>
      <div className="flex items-center justify-center">
        <img
          src={`${weatherIconUrl}${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <p className="text-5xl font-bold">{Math.round(main.temp)}&deg;C</p>
      </div>
      <p className="capitalize -pt-10 text-lg">{weather[0].description}</p>
      <div className="text-right pb-16">
        <span className="text-lg">
          {t.feels} {Math.round(main.feels_like)}
          <span>&deg;C</span>
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
