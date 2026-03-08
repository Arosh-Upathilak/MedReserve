import { create } from "zustand";

export const useDeleteStore = create((set) => ({
  isOpen: false,
  deleteCallback: null,

  openDelete: (callback) =>
    set({
      isOpen: true,
      deleteCallback: callback,
    }),

  closeDelete: () =>
    set({
      isOpen: false,
      deleteCallback: null,
    }),
}));