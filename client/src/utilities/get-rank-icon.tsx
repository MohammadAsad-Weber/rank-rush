import { Crown, Medal, Trophy } from "lucide-react";

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Trophy className="h-5 w-5 text-amber-700" />;
    default:
      return (
        <span className="text-lg font-extrabold text-muted-foreground">
          #{rank}
        </span>
      );
  }
};
export default getRankIcon;
