import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useGeolocation from "../hooks/useGeo";
import WeatherCard from "./WeatherCard";
import { weatherIconUrl } from "../services/api";

const translations = {
  en: {
    placeholder: "Enter city name ...",
    button: "Search",
    forecastTitle: "Forecast Weather",
    loading: "Loading...",
    error: "Error",
  },
  ru: {
    placeholder: "Введите город ...",
    button: "Поиск",
    forecastTitle: "Прогноз погоды",
    loading: "Загрузка...",
    error: "Ошибка",
  },
};

const Weather = () => {
  const { loading, error, data: geoData } = useGeolocation();
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const {
    data,
    error: apiError,
    isLoading: apiLoading,
  } = useFetch(geoData, searchQuery, lang);

  if (loading) {
    return <p className="text-blue-500 text-lg font-semibold">{t.loading}</p>;
  }
  if (error) {
    return (
      <p className="text-red-500 text-lg font-semibold">
        {t.error}: {error.message}
      </p>
    );
  }

  const { currentWeather, forecast } = data || {};

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      console.log("city=", city);
      setSearchQuery(city.trim());
    }
  };

  return (
    <div className="text-black">
      {error && <p>{error.message}</p>}
      {apiError && <p>{apiError.message}</p>}
      <div className="my-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row md:justify-between justify-center items-center gap-2"
        >
          <div>
            <input
              type="text"
              placeholder={t.placeholder}
              className="w-full md:w-auto px-4 py-3 border text-lg border-gray-300 rounded-md bg-slate-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-3 bg-accent text-lg text-white rounded-md"
            >
              {t.button}
            </button>
          </div>
          <div className="flex justify-center md:justify-end gap-2 my-4">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded ${
                lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`px-4 py-2 rounded ${
                lang === "ru" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              RU
            </button>
          </div>
        </form>
      </div>

      {currentWeather && <WeatherCard data={currentWeather} lang={lang} />}

      <div className="flex flex-col items-center justify-center">
        {forecast && (
          <div className="p-4 rounded-2xl bg-blue-400">
            <h2 className="text-lg font-bold mb-4">{t.forecastTitle}</h2>
            <ul className="flex flex-col md:flex-row gap-4 overflow-x-hidden ">
              {forecast.list.slice(0, 5).map((forecastItem, index) => (
                <li
                  key={index}
                  className="p-4 bg-white/40 rounded-2xl border border-black/30"
                >
                  <p className="text-lg font-semibold">{forecastItem.dt_txt}</p>
                  <div className="flex items-center justify-center">
                    <img
                      className="w-16 h-16"
                      src={`${weatherIconUrl}${forecastItem.weather[0].icon}@2x.png`}
                    />
                    <p className="text-2xl font-bold">
                      {Math.round(forecastItem.main.temp)}&deg;C
                    </p>
                  </div>
                  <p>{forecastItem.weather[0].description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
