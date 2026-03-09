import { WeatherIcon } from "./WeatherIcon";
import { Droplets } from "lucide-react";
import { motion } from "framer-motion";

export interface DailyForecast {
  day: string;
  high: number;
  low: number;
  code: number;
  precipitation: number;
  leftPercent: number;
  widthPercent: number;
  i: number;
}

export const DailyForecastItem = ({
  day,
  high,
  code,
  low,
  precipitation,
  leftPercent,
  widthPercent,
  i,
}: DailyForecast) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * i }}
      className="flex gap-3 items-center"
    >
      <span className="text-sm font-medium w-14">{day}</span>

      <WeatherIcon size={15} code={code}/>

      <div className="flex gap-1 w-15 md:text-sm text-[10px] text-accent items-center">
        <Droplets className="text-accent" size={8} />
        <span>{precipitation}%</span>
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-muted-foreground text-[12px] w-8 md:w-8 md:text-sm text-left">
          {low}°
        </span>

        <div className="flex-1 relative h-1 rounded-full bg-secondary mx-3">
          <div
            className="h-full absolute rounded-full"
            style={{
              left: `${leftPercent}%`,
              width: `${Math.max(widthPercent, 10)}%`,
              background:
                "linear-gradient(90deg, hsl(200 80% 55%), hsl(32 95% 55%))",
            }}
          />
        </div>

        <span className="md:w-8 font-semibold w-7 text-[12px] md:text-sm text-right">{high}°</span>
      </div>
    </motion.div>
  );
};
