import { User } from "./user";

export type ReviewType = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User
};
