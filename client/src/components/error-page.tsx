import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Interface
interface ErrorPageProps {
  status?: string;
  statusCode?: number;
  message?: string;
}
function ErrorPage({
  status = "Page Not Found",
  statusCode = 404,
  message = `The page you're looking for doesn't exist or has been moved`,
}: ErrorPageProps) {
  return (
    <section className="max-w-lg w-full text-center flex flex-col items-center justify-center gap-7.5">
      <div className="w-full flex flex-col items-center justify-center gap-1.5">
        <h1 className="text-7xl font-extrabold">{statusCode}</h1>
        <h3 className="text-2xl text-primary font-semibold">{status}</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <Link to="/">
        <Button size="lg">Go Home</Button>
      </Link>
    </section>
  );
}

export default ErrorPage;
