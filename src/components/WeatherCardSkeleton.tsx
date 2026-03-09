import { motion } from "framer-motion";

export const WeatherCardSkeleton = () => {
  return (
    <div className="p-8 glass w-full md:w-160">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-5 items-center"
      >
        <div className="flex gap-2 items-center">
          <div className="w-30 h-3.5 bg-muted rounded-2xl animate-pulse" />
        </div>

        <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />

        <div className="bg-muted rounded-xl h-20 w-40 animate-pulse" />

        <div className="w-50 h-5.5 bg-muted rounded-2xl animate-pulse" />

        <div className="w-40 h-4.5 bg-muted rounded-2xl animate-pulse" />

        <div className="grid grid-cols-2 gap-2 md:flex md:justify-between w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-32 glass-sm flex flex-col items-center p-3 gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-3 rounded-2xl bg-muted animate-pulse" />
                <div className="w-15 h-4 rounded-2xl bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
