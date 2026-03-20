import { create } from "zustand";

export const useDoctorStore = create((set) => ({
  doctors: [],   // must be an array
  setDoctors: (data) => set({ doctors: data }),
}));