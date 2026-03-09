import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudSun,
  HelpCircle,
} from "lucide-react";

export const getIconByCode = (code: number) => {
  if (code === 1000) {
    return Sun;
  }
  if (code === 1003) {
    return CloudSun;
  }
  if ([1006, 1009, 1030, 1135, 1147].includes(code)) {
    return Cloud;
  }
  if (
    [
      1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
      1201, 1240, 1243, 1246,
    ].includes(code)
  ) {
    return CloudRain;
  }
  if (
    [
      1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
      1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
    ].includes(code)
  ) {
    return CloudSnow;
  }
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return CloudLightning;
  }
  return HelpCircle;
};

export const getColorByCode = (code: number) => {
  if (code === 1000) {
    return "text-weather-sun";
  }

  if (code === 1003) {
    return "text-weather-cloud-sun";
  }

  if ([1006, 1009, 1030, 1135, 1147].includes(code)) {
    return "text-weather-cloud";
  }

  if (
    [
      1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246,
    ].includes(code)
  ) {
    return "text-weather-rain";
  }

  if (
    [
      1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255,
      1258,
    ].includes(code)
  ) {
    return "text-weather-snow";
  }

  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return "text-weather-storm";
  }

  return "text-slate-500";
};
