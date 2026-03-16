import { create } from "zustand";

export const useDeleteStore = create((set) => ({
  isOpen: false,
  deleteCallback: null,
  loading: false,

  openDelete: (callback) =>
    set({
      isOpen: true,
      deleteCallback: callback,
    }),

  setLoading: (value) =>
  set({
    loading: value
  }),

  closeDelete: () =>
    set({
      isOpen: false,
      deleteCallback: null,
      loading: false
    }),
}));