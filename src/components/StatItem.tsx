import type { LucideIcon } from "lucide-react";
import { Droplets, Wind, Eye, Gauge } from "lucide-react";
import { Typography } from "./ui/Typography";

type type_stat = "visi" | "humi" | "wind" | "press";

interface StatItemProps {
  type: type_stat;
  value: number;
}

const iconMap: Record<
  type_stat,
  { Icon: LucideIcon; label: string; unit: string }
> = {
  humi: { Icon: Droplets, label: "Umidade", unit: "%" },
  wind: { Icon: Wind, label: "Vento", unit: " km/h" },
  visi: { Icon: Eye, label: "Visibilidade", unit: " km" },
  press: { Icon: Gauge, label: "Pressão", unit: " hPa" },
};

export const StatItem = ({ type, value }: StatItemProps) => {
  const { Icon, label, unit } = iconMap[type];

  return (
    <div className="p-3 flex flex-col items-center w-32 glass-sm gap-1">
      <Icon size={16} className="text-accent" />

      <div className="text-center">
        <Typography type="h3">{label}</Typography>
        <span className="font-bold text-sm">
          {value}
          {unit}
        </span>
      </div>
    </div>
  );
};
