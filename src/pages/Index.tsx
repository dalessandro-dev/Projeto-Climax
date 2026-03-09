import { SearchBar } from "./../components/SearchBar";
import { WeatherCard } from "./../components/WeatherCard";
import { WeatherIcon } from "./../components/WeatherIcon";
import { useEffect, useState } from "react";
import { useWeatherApi } from "./../hooks/useWeatherApi";
import { WeatherCardSkeleton } from "./../components/WeatherCardSkeleton";
import { motion } from "framer-motion";
import { DailyForecast } from "./../components/DailyForecast";
import { DailyForecastSkeleton } from "./../components/DailyForecastSkeleton";
import { HourlyForecast } from "./../components/HourlyForecast";
import { HourlyForecastSkeleton } from "./../components/HourlyForecastSkeleton";
import { Footer } from "./../components/Footer";

export const Index = () => {
  const {
    isLoading,
    fetchSuggestions,
    suggestions,
    fetchWeather,
    weatherData,
    dailyForecastData,
    hourlyForecastData,
  } = useWeatherApi();

  const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não suportada pelo seu navegador."));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude},${longitude}`);
        },
        (error) => {
          reject(error);
        },
      );
    });
  };

  const [city, setCity] = useState("Sao Paulo");

  useEffect(() => {
    const initLocation = async () => {
      try {
        const coords = (await getBrowserLocation()) as string;
        const data = await fetchWeather(coords);

        setCity(data!.city);
      } catch (err) {
        fetchWeather(city);
      }
    };
    initLocation();
  }, []);

  useEffect(() => {
    const loadWeather = async () => await fetchWeather(city);

    loadWeather();
  }, [city]);

  return (
    <div className="min-h-screen w-screen gradient-sky flex flex-col items-center gap-5 p-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-1 mt-4 md:mb-4 mb-2"
      >
        <WeatherIcon code={1000} size={28} />

        <h1 className="text-2xl font-bold tracking-tight">Climax</h1>
      </motion.div>

      <SearchBar
        fetchCities={fetchSuggestions}
        suggestions={suggestions}
        onSelectCity={setCity}
      />

      {!isLoading && weatherData && dailyForecastData ? (
        <>
          <WeatherCard
            city={city}
            country={weatherData.country}
            temperature={weatherData.temperature}
            feelsLike={weatherData.feelsLike}
            condition={weatherData.condition}
            description={weatherData.description}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            uvIndex={weatherData.uvIndex}
            visibility={weatherData.visibility}
            pressure={weatherData.pressure}
            code={weatherData.code}
          />

          <HourlyForecast hours={hourlyForecastData} />

          <DailyForecast days={dailyForecastData} />
        </>
      ) : (
        <>
          <WeatherCardSkeleton />
          <HourlyForecastSkeleton />
          <DailyForecastSkeleton />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
