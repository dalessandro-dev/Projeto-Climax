import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Typography } from "./ui/Typography";

interface SearchBarProps {
  onSelectCity: (city: string) => void;
  fetchCities: (query: string) => Promise<string[] | void>;
  suggestions: string[];
}

export const SearchBar = ({
  onSelectCity,
  fetchCities,
  suggestions,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const DELAY = 300;

  useEffect(() => {
    const loadCities = async () => {
      await fetchCities(query);
    };

    const delayDebounceFn = setTimeout(() => loadCities(), DELAY);

    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchCities]);

  return (
    <div className="relative md:w-120 w-full">
      <div className="glass w-full flex justify-between">
        <div className="p-3">
          <Search size={18} className="text-muted-foreground" />
        </div>

        <input
          placeholder="Buscar cidade..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-9/10 rounded-r-xl outline-none placeholder:text-muted-foreground bg-transparent pr-3"
        />
      </div>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col absolute top-full left-0 right-0 glass mt-2 z-50 overflow-hidden"
          >
            {suggestions.map((city: any) => {
              return (
                <button
                  key={city.id}
                  onMouseDown={() => {
                    setQuery(city.name);
                    setIsFocused(false);
                    onSelectCity(city.name);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
                >
                  <div className="flex gap-3 items-center">
                    <MapPin size={14} />
                    <span>{city.name}</span>
                  </div>

                  <Typography type="h2">{city.country}</Typography>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
