import axios from "axios";
import BackendError from "./backend-error";
import type { ErrorResponse } from "@/hooks/types";

const handleError = (error: unknown) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const errorObject = error.response?.data;
    if (errorObject) throw new BackendError(errorObject);
    throw error;
  }
  if (error instanceof Error) throw error;
  throw new Error("An unknown error occurred");
};

export default handleError;
