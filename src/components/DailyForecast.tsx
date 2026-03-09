import { motion } from "framer-motion";
import { Typography } from "./ui/Typography";
import { DailyForecastItem } from "./DailyForecastItem";

export interface DailyForecastProps {
  days: {
    day: string;
    high: number;
    low: number;
    code: number;
    precipitation: number;
  }[];
}

export const DailyForecast = ({ days }: DailyForecastProps) => {
  const minTemp = Math.min(...days.map((day) => day.low));
  const maxTemp = Math.max(...days.map((day) => day.high));
  const range = maxTemp - minTemp;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 glass w-full md:w-160 flex flex-col gap-4"
    >
      <Typography type="h2">PREVISÃO DE 7 DIAS</Typography>

      <div className="w-full flex flex-col gap-3">
        {days.map((day, i) => {
          const widthPercent = ((day.high - day.low) / range) * 100;
          const leftPercent = ((day.low - minTemp) / range) * 100;

          return <DailyForecastItem key={day.day} {...{
            ...day,
            i,
            widthPercent,
            leftPercent,
          }} />
        })}
      </div>
    </motion.div>
  );
};
