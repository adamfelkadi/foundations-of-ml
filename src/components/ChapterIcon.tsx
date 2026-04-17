"use client";

import PublicIcon from "@mui/icons-material/Public";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import StraightenIcon from "@mui/icons-material/Straighten";
import BalanceIcon from "@mui/icons-material/Balance";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import BoltIcon from "@mui/icons-material/Bolt";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CategoryIcon from "@mui/icons-material/Category";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import LoopIcon from "@mui/icons-material/Loop";
import ShieldIcon from "@mui/icons-material/Shield";
import CompressIcon from "@mui/icons-material/Compress";
import MemoryIcon from "@mui/icons-material/Memory";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from "@mui/icons-material/Link";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const iconMap: Record<string, React.ComponentType<SvgIconProps>> = {
  public: PublicIcon,
  gps: GpsFixedIcon,
  straighten: StraightenIcon,
  balance: BalanceIcon,
  linear: LinearScaleIcon,
  blur: BlurOnIcon,
  bolt: BoltIcon,
  flash: FlashOnIcon,
  category: CategoryIcon,
  leaderboard: LeaderboardIcon,
  trending: TrendingUpIcon,
  shuffle: ShuffleIcon,
  loop: LoopIcon,
  shield: ShieldIcon,
  compress: CompressIcon,
  memory: MemoryIcon,
  esports: SportsEsportsIcon,
  book: AutoStoriesIcon,
  brain: PsychologyIcon,
  settings: SettingsIcon,
  link: LinkIcon,
};

export default function ChapterIcon({
  name,
  size = "medium",
  className,
}: {
  name: string;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  const Icon = iconMap[name];
  if (!Icon) return null;

  const sizeMap = { small: 20, medium: 28, large: 36 };

  return (
    <Icon
      className={className}
      sx={{ fontSize: sizeMap[size], color: "#B45309" }}
    />
  );
}
