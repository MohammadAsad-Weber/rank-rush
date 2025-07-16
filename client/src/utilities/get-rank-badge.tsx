import { Badge } from "@/components/ui/badge";

const getRankBadge = (rank: number) => {
  let badgeColor = "bg-muted text-muted-foreground";
  let badgeText = "Unknown";
  switch (rank) {
    case 1:
      badgeColor = "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      badgeText = "Champion";
      break;
    case 2:
      badgeColor = "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      badgeText = "Runner-up";
      break;
    case 3:
      badgeColor = "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      badgeText = "Third Place";
      break;
  }

  return (
    <Badge variant="secondary" className={`text-xs mt-0.5 ${badgeColor}`}>
      {badgeText}
    </Badge>
  );
};
export default getRankBadge;
