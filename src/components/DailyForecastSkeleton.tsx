import { motion } from "framer-motion";

export const DailyForecastSkeleton = () => {
  return (
    <div className="p-8 glass w-full md:w-160">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex w-40 h-5 items-center bg-muted rounded-2xl animate-pulse" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex gap-3 w-full items-center">
            <div className="bg-muted rounded-2xl animate-pulse h-4 w-10" />
            <div className="bg-muted rounded-2xl animate-pulse w-4.5 h-4.5" />
            <div className="bg-muted rounded-2xl animate-pulse h-3 w-12" />
            <div className="bg-muted rounded-2xl animate-pulse h-1.5 flex-1" />
            <div className="bg-muted rounded-2xl animate-pulse h-4 w-8" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
