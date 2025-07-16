interface User {
  _id: string;
  fullname: string;
  points: number;
  createdAt: Date;
}
interface Record extends Omit<User, "createdAt"> {
  rank: number;
}
export interface GeneralResponse {
  status: string;
  status_code: number;
  message: string;
}
export interface UsersResponse extends Omit<GeneralResponse, "message"> {
  users: User[];
}
export interface LeaderboardResponse
  extends Omit<GeneralResponse, "message"> {
  result: Record[];
}
export type ErrorResponse = GeneralResponse;
