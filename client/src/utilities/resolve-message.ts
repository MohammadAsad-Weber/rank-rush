import axios from "axios";
import type { ErrorResponse } from "@/hooks/types";

const resolveMessage = (error: unknown) => {
  let message = "An unknown error occurred";
  if (axios.isAxiosError<ErrorResponse>(error)) {
    message = error.response?.data?.message ?? error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};

export default resolveMessage;
