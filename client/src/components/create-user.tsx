// External Libraries
import { Plus, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Custom Hooks
import useRequest from "@/hooks/useRequest";

// Validation Schema & Types
import {
  CreateUserSchema,
  type CreateUserType,
} from "@/schemas/create-user-schema";

// UI components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

function CreateUser() {
  // Hooks
  const { createUser } = useRequest();
  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    mode: "all",
    defaultValues: {
      fullname: "",
    },
  });

  return (
    <Dialog>

      {/* DIALOG TRIGGER */}
      <DialogTrigger asChild>
        <Button variant="outline" className="aspect-square h-11 rounded-xl">
          <Plus className="aspect-square h-10" />
        </Button>
      </DialogTrigger>

      {/* DIALOG CONTENT */}
      <DialogContent className="max-w-md w-full flex flex-col items-center justify-center gap-7.5 rounded-3xl shadow-xl">
        
        {/* HEADER */}
        <DialogHeader className="w-full text-center flex flex-col items-center justify-center gap-3.5">
          
          {/* USER ICON */}
          <div className="aspect-square w-16 inline-flex items-center justify-center bg-secondary/30 rounded-2xl border">
            <User className="aspect-square w-10 text-foreground" />
          </div>

          {/* TITLE */}
          <DialogTitle className="text-2xl font-bold">
            Create New User
          </DialogTitle>

          {/* DESCRIPTION */}
          <DialogDescription className="text-center">
            Add a new participant to the leaderboard by entering their name. The
            user will be saved to the database and immediately become eligible
            to earn points and appear in the real-time rankings.
          </DialogDescription>

        </DialogHeader>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => createUser(data, form.reset))}
            className="w-full flex flex-col items-center justify-center gap-5"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-start justify-center gap-3.5">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full py-5 rounded-lg"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className="w-full h-10 rounded-lg"
            >
              Submit
            </Button>
          </form>
        </Form>
        
      </DialogContent>

    </Dialog>
  );
}

export default CreateUser;
