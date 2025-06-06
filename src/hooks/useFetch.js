import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/api";

export default function useFetch(geoData, searchQuery, lang = "en") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", searchQuery || geoData, lang],
    queryFn: () =>
      searchQuery
        ? fetchWeatherByCity(searchQuery, lang)
        : fetchWeatherByCoords(geoData, lang),
    enabled: (!!geoData?.latitude && !!geoData?.longitude) || !!searchQuery,
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,

  });

  return { data, error, isLoading };
}
