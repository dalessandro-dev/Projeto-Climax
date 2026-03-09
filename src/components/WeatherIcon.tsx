import { getIconByCode, getColorByCode } from "../utils/WeatherUtils";
import { motion } from "framer-motion";

interface WeatherIconProps {
  size?: number;
  code: number
  className?: string;
}

export const WeatherIcon = ({
  size = 48,
  className = "",
  code
}: WeatherIconProps) => {
  const Icon = getIconByCode(code)
  const color = getColorByCode(code)

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      <Icon size={size} className={color} />
    </motion.div>
  );
};
