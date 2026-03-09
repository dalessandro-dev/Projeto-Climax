import { Typography } from "./ui/Typography";
import { WeatherIcon } from "./WeatherIcon";
import { StatItem } from "./StatItem";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { weatherText } from "../lib/WeatherText";

export interface WeatherCardProps {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  visibility: number;
  code: number;
  pressure: number;
}

export const WeatherCard = (props: WeatherCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 glass w-full md:w-160 flex flex-col items-center gap-5"
    >
      <div className="flex gap-1 items-center">
        <MapPin size={14} className="text-muted-foreground" />
        <Typography type="h2">
          {props.city}, {props.country}
        </Typography>
      </div>

      <WeatherIcon code={props.code} size={80} />

      <div className="flex flex-col items-center">
        <motion.div
          key={props.temperature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <span className="text-gradient-sun font-bold text-7xl md:text-8xl">
            {props.temperature}°
          </span>
        </motion.div>

        <div className="p-1 text-center">
          <Typography type="h1">{weatherText[props.code]}</Typography>
          <Typography type="h3">
            Sensação térmica de {props.feelsLike}°
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 justify-between md:flex md:justify-between w-full">
        <StatItem type="humi" value={props.humidity} />
        <StatItem type="wind" value={props.windSpeed} />
        <StatItem type="visi" value={props.visibility} />
        <StatItem type="press" value={props.pressure} />
      </div>
    </motion.div>
  );
};
