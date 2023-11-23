import { User } from "../../../global/interfaces/user";

export interface LoginRes {
  user: User
  access_token: string
}