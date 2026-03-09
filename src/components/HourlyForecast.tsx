import { motion, useMotionValue } from "framer-motion";
import { Typography } from "./ui/Typography";
import { WeatherIcon } from "./WeatherIcon";
import { useEffect, useRef, useState } from "react";

export interface HourlyForecastProps {
  hours: {
    time: string;
    temperature: number;
    code: number;
  }[];
}

export const HourlyForecast = ({ hours }: HourlyForecastProps) => {
  const divWithForecastRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const [maxDrag, setMaxDrag] = useState(0);

  const scrollerX = useMotionValue(0);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const div = divWithForecastRef.current;
    const rail = railRef.current;

    if (div) {
      const hasScroll = div.scrollWidth > div.clientWidth;
      setShowScroll(hasScroll);

      if (scrollerRef.current && rail) {
        const ratio = div.clientWidth / div.scrollWidth;
        const width = Math.max(20, div.clientWidth * ratio);

        scrollerRef.current.style.width = `${width}px`;
        setMaxDrag(rail.clientWidth - width);
      }
    }
    console.log(showScroll);
  }, [showScroll, hours]);

  const handleScroll = () => {
    const div = divWithForecastRef.current;
    const rail = railRef.current;
    const scroller = scrollerRef.current;

    if (div && rail && scroller) {
      const scrollableWidth = div.scrollWidth - div.clientWidth;
      const pct = div.scrollLeft / scrollableWidth;

      const maxTravel = rail.clientWidth - scroller.offsetWidth;
      scrollerX.set(pct * maxTravel);
    }
  };

  const handleDrag = () => {
    const div = divWithForecastRef.current!;
    const rail = railRef.current!;

    const maxTravel = rail.clientWidth - scrollerRef.current!.offsetWidth;
    const pct = scrollerX.get() / maxTravel;

    div.scrollLeft = pct * (div.scrollWidth - div.clientWidth);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass w-full md:w-160 p-8 flex flex-col gap-4"
    >
      <Typography type="h2">PREVISÃO POR HORA</Typography>

      <div
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide gap-4"
        ref={divWithForecastRef}
      >
        {hours.map((hour) => {
          return (
            <div
              key={hour.time}
              className="flex flex-col items-center min-w-15 gap-1 shrink-0"
            >
              <Typography type="h3">{hour.time}</Typography>
              <WeatherIcon code={hour.code} size={19} />
              <span className="text-sm font-semibold">{hour.temperature}°</span>
            </div>
          );
        })}
      </div>

      {showScroll && (
        <div
          className="w-full flex h-2 bg-muted rounded-2xl relative"
          ref={railRef}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0}
            dragMomentum={false}
            className="absolute left-0 h-full rounded-2xl bg-muted-foreground transition-colors cursor-pointer hover:bg-foreground"
            ref={scrollerRef}
            onDrag={handleDrag}
            style={{ x: scrollerX }}
          />
        </div>
      )}
    </motion.div>
  );
};
