import { create } from "zustand";

export const useDashBoardStore = create((set) => ({
  dashBoardStore: [],   // must be an array
  setDashBoardStore: (data) => set({ dashBoardStore: data }),
}));