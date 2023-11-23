import { create } from "zustand";
import { User } from "../global/interfaces/user";

interface State {
  user: User | null
  state: "unlogged" | "loading" | "logged"
}

interface Functions {
  setUser: (user: User) => void
  logout: () => void
}

export const useUser = create<State & Functions>(set => {
  const token = document.cookie.replace("token=", "");
  return {
    user: null,
    state: token ? "loading" : "unlogged",
    setUser: (user) => set(old => ({...old, user, state: "logged" })),
    logout: () => set(old => ({...old, user: null, state: "unlogged" }))
  }
});