// External Libraries
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Custom Hook
import useRequest from "@/hooks/useRequest";

// Components
import Loader from "./loader";
import ErrorPage from "./error-page";

// Utilities
import getRankIcon from "@/utilities/get-rank-icon";
import getRankBadge from "@/utilities/get-rank-badge";
import formatNumberShort from "@/utilities/format-number";
import type BackendError from "@/utilities/backend-error";

// UI Components
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Leaderboard() {
  // Hooks
  const { getLeaderboard } = useRequest();
  const { data, status, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });

  // Memoize user or fallback to []
  const users = useMemo(() => {
    if (!data) return [];
    else return data;
  }, [data]);

  // Conditional Rendering
  if (status === "pending") return <Loader />;
  if (status === "error") {
    const backendError = error as BackendError;
    const statusCode = backendError?.status_code ?? 500;
    const status = backendError?.status ?? "Internal server error";
    const message = backendError?.message ?? "An unknown error has occured";

    return (
      <ErrorPage statusCode={statusCode} status={status} message={message} />
    );
  }
  if (status === "success") {
    return (
      <Card className="max-w-[920px] w-full px-1.5 relative rounded-3xl shadow-xl">

        {/* HOME LINK */}
        <Link to="/" className="absolute top-5 left-5">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="aspect-square h-8" />
          </Button>
        </Link>

        {/* HEADER */}
        <CardHeader className="w-full text-center flex flex-col items-center justify-center gap-2.5">
        
          {/* TITLE */}
          <CardTitle className="text-3xl font-bold">Leadership Board</CardTitle>

          {/* DESCRIPTION */}
          <CardDescription>
            Top performers and their current standings
          </CardDescription>

        </CardHeader>

        {/* CONTENT > LEADERBOARD */}
        <CardContent className="w-full max-h-[calc(100vh_-_12.625rem)] min-h-[calc(100vh_-_12.625rem)] relative overflow-auto">
          {users.length > 0 ? (
            <Table>

              {/* TABLE HEADER */}
              <TableHeader>
                <TableRow className="text-base">
                  <TableHead className="w-[15%] text-muted-foreground">
                    Rank
                  </TableHead>
                  <TableHead className="w-[60%] text-muted-foreground">
                    User
                  </TableHead>
                  <TableHead className="w-[25%] text-center text-muted-foreground">
                    Points
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* LEADERBOARD DATA */}
              <TableBody>
                {users.map(({ _id, rank, fullname, points }) => {
                  return (
                    <TableRow key={_id} className="text-lg font-semibold">
                      <TableCell>{getRankIcon(rank)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-start gap-3.5">
                          {fullname}
                          {rank <= 3 && getRankBadge(rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center justify-center">
                          {formatNumberShort(points)}
                          <span className="text-muted-foreground text-sm font-normal">
                            points
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

            </Table>
          ) : (
            <h3 className="text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-3xl text-muted-foreground font-bold">
              Be the first to join the leaderboard
            </h3>
          )}
        </CardContent>
        
      </Card>
    );
  }
}

export default Leaderboard;
