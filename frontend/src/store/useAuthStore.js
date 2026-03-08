import { create } from "zustand";
import { getUserFromToken } from "../utils/auth.js";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  user: getUserFromToken(),
  authStep: "login",
  backendUrl: import.meta.env.VITE_BACKEND_URL,

  setAuthStep: (step) => set({ authStep: step }),

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      set({
        token,
        user: getUserFromToken()
        
      });
    } else {
      localStorage.removeItem("token");
      set({
        token: null,
        user: null
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null
    });
  },
}));