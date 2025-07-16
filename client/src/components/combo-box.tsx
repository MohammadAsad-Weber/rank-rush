// External Libraries
import { useMemo } from "react";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Form Management
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, type FormType } from "@/schemas/form-schema";

// Custom Hooks & Utilities
import useRequest from "@/hooks/useRequest";
import type BackendError from "@/utilities/backend-error";

// Components
import Loader from "./loader";
import ErrorPage from "./error-page";
import CreateUser from "./create-user";

// UI components
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function ComboBox() {
  // Hooks
  const { getUsers, claimPoints } = useRequest();
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode: "all",
  });
  const { data, status, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
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
  if (status == "success") {
    return (
      <Card className="max-w-md w-full py-7.5 px-2.5 flex flex-col items-center justify-center gap-7.5 rounded-3xl shadow-xl">
        
        {/* HEADER */}
        <CardHeader className="w-full text-center flex flex-col items-center justify-center gap-3.5">
          
          {/* TROPHY ICON */}
          <div className="aspect-square w-16 inline-flex items-center justify-center bg-secondary/30 rounded-2xl border">
            <Trophy className="aspect-square w-10 text-foreground" />
          </div>

          {/* TITLE */}
          <CardTitle className="text-2xl font-bold">Claim Points</CardTitle>

          {/* DESCRIPTION */}
          <CardDescription>
            Select a competitor from the leaderboard to claim points and track
            their ranking progress.
          </CardDescription>

        </CardHeader>

        {/* CONTENT > FORM */}
        <CardContent className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(claimPoints)}
              className="w-full flex flex-col items-center justify-center gap-5"
            >
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start justify-center gap-3.5">
                    <FormLabel>Choose Competitor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          disabled={users.length === 0}
                          className="w-full py-5 rounded-lg"
                        >
                          <SelectValue
                            placeholder={
                              users.length > 0
                                ? "Choose a competitor from the list"
                                : "No users available — create one to proceed"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map(({ _id, fullname }) => {
                          return (
                            <SelectItem key={_id} value={_id}>
                              {fullname}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* BUTTONS */}
              <div className="w-full flex items-center justify-center gap-2.5">
                <Button
                  type="submit"
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                  className="grow h-10 rounded-lg"
                >
                  Claim Points
                </Button>
                <CreateUser />
              </div>

              {/* LEADERSHIP LINK */}
              <FormDescription>
                Looking to lead?{" "}
                <Link
                  to="/leaderboard"
                  className="text-blue-500 hover:underline"
                >
                  Navigate to Leadership
                </Link>
              </FormDescription>
            </form>
          </Form>
        </CardContent>
        
      </Card>
    );
  }
}

export default ComboBox;
