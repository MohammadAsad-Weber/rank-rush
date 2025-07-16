import { toast } from "sonner";
import instance from "@/service/instance";
import handleError from "@/utilities/handle-error";
import { useQueryClient } from "@tanstack/react-query";
import resolveMessage from "@/utilities/resolve-message";

// Types
import type { AxiosResponse } from "axios";
import type { FormType } from "@/schemas/form-schema";
import type { CreateUserType } from "@/schemas/create-user-schema";
import type {
  GeneralResponse,
  LeaderboardResponse,
  UsersResponse,
} from "./types";

const useRequest = () => {
  // useQueryClient Hook
  const queryClient = useQueryClient();

  // API Functions
  const getUsers = async () => {
    try {
      const response = await instance.get<UsersResponse>("/api/user");
      return response.data.users;
    } catch (error) {
      handleError(error);
    }
  };
  const createUser = async (data: CreateUserType, callback: () => void) => {
    toast.promise(
      instance
        .post<GeneralResponse, AxiosResponse<GeneralResponse>, typeof data>(
          "/api/user/",
          data
        )
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          callback();
          return response.data.message;
        }),
      {
        loading: "Setting up the new user profile",
        success: (message) => message,
        error: (err) => resolveMessage(err),
      }
    );
  };
  const claimPoints = (data: FormType) => {
    toast.promise(
      instance
        .post<GeneralResponse>(`/api/points/${data.userId}`)
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
          return response.data.message;
        }),
      {
        loading: "Hang tight, your points are on the way",
        success: (message) => message,
        error: (error) => resolveMessage(error),
      }
    );
  };
  const getLeaderboard = async () => {
    try {
      const response = await instance.get<LeaderboardResponse>(
        "/api/leaderboard"
      );
      return response.data.result;
    } catch (error) {
      handleError(error);
    }
  };

  //Returning functions
  return { getUsers, createUser, claimPoints, getLeaderboard };
};

export default useRequest;
