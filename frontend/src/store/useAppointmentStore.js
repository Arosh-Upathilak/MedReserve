import { create } from "zustand";

export const useAppointmentStore = create((set) => ({
  doctorAppointment: [],   
  setDoctorAppointment: (data) => set({ doctorAppointment: data }),
}));






