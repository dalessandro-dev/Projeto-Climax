import { motion } from "framer-motion";

export const HourlyForecastSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="glass w-full md:w-160 p-8 flex flex-col gap-4"
    >
      <div className="h-4 w-32 rounded-full bg-muted animate-pulse" />

      <div className="flex gap-4">
        {Array.from({ length: 7 }).map((_, i) => {
          return (
            <div key={i} className={`flex-col items-center min-w-15 gap-2 ${i >= 3 ? "hidden md:flex" : "flex"}`}>
              <div className="w-8 h-3 rounded-full bg-muted animate-pulse" />
              <div className="w-5 h-5 rounded-full bg-muted animate-pulse" />
              <span className="h-4 w-8 rounded-full bg-muted animate-pulse" />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
