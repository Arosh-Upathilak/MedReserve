import { create } from "zustand";

export const usePatientStore = create((set) => ({
  patients: [],
  setPatients: (data) => set({ patients: data })
}));