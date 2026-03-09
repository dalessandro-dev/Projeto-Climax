import { useCallback, useEffect, useState } from "react";
import type { WeatherCardProps } from "./../components/WeatherCard";
import type { DailyForecastProps } from "../components/DailyForecast";
import type { HourlyForecastProps } from "../components/HourlyForecast";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

export const useWeatherApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherCardProps | null>(null);
  const [dailyForecastData, setDailyForecastData] =
    useState<DailyForecastProps | null>(null);
  const [hourlyForecastData, setHourlyForecastData] =
    useState<HourlyForecastProps | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState<{
    city?: string;
    code: number;
    message: string;
  } | null>(null);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const fetchSuggestions = useCallback(
    async (query: string): Promise<string[] | void> => {
      if (query.length < 3) {
        setSuggestions([]);
        return [];
      }

      try {
        const response = await fetch(
          `${BASE_URL}/search.json?key=${API_KEY}&q=${query}&lang=pt`,
        );

        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Erro nas sugestões", err);
      }
    },
    [],
  );

  const fetchWeather = useCallback(
    async (city: string, retries: number = 3) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!isOnline) {
          throw new Error("O usuário está Offline");
        }

        const response = await fetch(
          `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`,
        );

        const data = await response.json();

        const formattedDataWeather = {
          city: data.location.name,
          country: data.location.country,
          temperature: data.current.temp_c,
          feelsLike: data.current.feelslike_c,
          condition: data.current.condition.text,
          description: data.current.condition.text,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          uvIndex: data.current.uv,
          visibility: data.current.vis_km,
          code: data.current.condition.code,
          pressure: data.current.pressure_mb,
        };

        setWeatherData(formattedDataWeather);

        const formattedForecast = data.forecast.forecastday.map(
          (day: any, i: number) => {
            const date = new Date(day.date + "T00:00:00");

            const dayName = new Date(date).toLocaleDateString("pt-BR", {
              weekday: "short",
            });

            return {
              day:
                i === 0
                  ? "Hoje"
                  : dayName.charAt(0).toUpperCase() + dayName.slice(1, -1),
              high: day.day.maxtemp_c,
              low: day.day.mintemp_c,
              code: day.day.condition.code,
              precipitation: day.day.daily_chance_of_rain,
            };
          },
        );

        setDailyForecastData(formattedForecast);

        const localTimeEpoch = data.location.localtime_epoch;
        const formatedHours = data.forecast.forecastday[0].hour
          .filter((hour: any) => {
            return hour.time_epoch >= localTimeEpoch - 3600;
          })
          .map((hour: any, i: number) => ({
            time: i === 0 ? "Agora" : hour.time.split(" ")[1].slice(0, 2) + "h",
            temperature: hour.temp_c,
            code: hour.condition.code,
          }));

        setHourlyForecastData(formatedHours);

        setIsLoading(false);

        return formattedDataWeather;
      } catch (err) {
        console.error("Erro ao buscar clima", err);

        if (retries > 0) {
          await delay(2000);
          return fetchWeather(city, retries - 1);
        } else {
          let message = "Erro interno";

          if (isOnline) {
            message = "Erro de conexão com a internet";
          }

          setError({ city, code: 500, message });
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (isOnline && error && error.code === 500) {
      const loadWeather = async () => {
        await fetchWeather(error.city!);
      };

      loadWeather();
    }
  }, [isOnline, error, fetchWeather]);

  return {
    isLoading,
    suggestions,
    error,
    weatherData,
    fetchSuggestions,
    fetchWeather,
    dailyForecastData,
    hourlyForecastData,
  };
};
